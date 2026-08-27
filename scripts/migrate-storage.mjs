import Database from "better-sqlite3";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import pg from "pg";
import { runPostgresMigrations } from "./run-postgres-migrations.mjs";

const dryRun=process.argv.includes("--dry-run");
const sqlitePath=resolve(process.env.LEGACY_SQLITE_PATH||resolve(process.cwd(),"sqlite.db"));
const sqlite=new Database(sqlitePath,{readonly:true,fileMustExist:true});
const tables=sqlite.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all().map(({name})=>name);
const rows=(table)=>tables.includes(table)?sqlite.prepare(`SELECT * FROM "${table.replaceAll('"','""')}"`).all():[];
const source={user:rows("user"),account:rows("account"),session:rows("session"),verification:rows("verification"),enquiries:rows("enquiries"),folders:rows("folders")};
const fingerprint=createHash("sha256").update(await readFile(sqlitePath)).digest("hex");

for(const [table,records] of Object.entries(source))console.log(`${table}: ${records.length} source records`);

function date(value){if(value instanceof Date)return value;if(typeof value==="number")return new Date(value);const parsed=new Date(String(value));if(Number.isNaN(parsed.valueOf()))throw new Error(`Invalid date in source data: ${String(value)}`);return parsed;}
function json(value){try{return JSON.parse(String(value||"{}"));}catch{throw new Error("Invalid enquiry JSON encountered.");}}
console.log("documents: intentionally excluded from migration");
console.log("R2: no legacy objects will be created");

const required=["DATABASE_URL"];
const missing=required.filter((name)=>!process.env[name]);
if(dryRun){console.log(`DRY RUN: no PostgreSQL writes were made. R2 is not accessed by this migration.`);if(missing.length)console.log(`Destination checks skipped; missing local variables: ${missing.join(", ")}`);else console.log("PostgreSQL configuration is present; run without --dry-run only after reviewing this report.");sqlite.close();process.exit(0);}
if(missing.length)throw new Error(`Missing required variables: ${missing.join(", ")}`);

await runPostgresMigrations();
const pool=new pg.Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.DATABASE_URL.includes("localhost")?undefined:{rejectUnauthorized:false}});

async function verifyCounts(client){for(const name of ["user","account","session","verification","enquiries","folders"]){const result=await client.query(`SELECT COUNT(*)::int count FROM "${name}"`);if(result.rows[0].count<source[name].length)throw new Error(`Destination verification failed for ${name}`);}}

const lockClient=await pool.connect();
try{
  await lockClient.query("SELECT pg_advisory_lock($1)",[762026001]);
  const previous=await lockClient.query("SELECT source_fingerprint FROM storage_migrations WHERE migration_key=$1",["sqlite-structured-v1"]);
  if(previous.rowCount){if(previous.rows[0].source_fingerprint!==fingerprint)throw new Error("Migration was previously completed from a different SQLite source. Manual review is required.");await verifyCounts(lockClient);console.log("Structured-data migration was already completed and destination verification passed.");process.exitCode=0;}else{
    await lockClient.query("BEGIN");
    try{
      for(const u of source.user)await lockClient.query(`INSERT INTO "user" (id,name,email,"emailVerified",image,"createdAt","updatedAt",role,banned,"banReason","banExpires") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT (id) DO NOTHING`,[u.id,u.name,u.email,Boolean(u.emailVerified),u.image,date(u.createdAt),date(u.updatedAt),u.role||"user",Boolean(u.banned),u.banReason,u.banExpires?date(u.banExpires):null]);
      for(const a of source.account)await lockClient.query(`INSERT INTO "account" (id,"accountId","providerId","userId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt",scope,password,"createdAt","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) ON CONFLICT (id) DO NOTHING`,[a.id,a.accountId,a.providerId,a.userId,a.accessToken,a.refreshToken,a.idToken,a.accessTokenExpiresAt?date(a.accessTokenExpiresAt):null,a.refreshTokenExpiresAt?date(a.refreshTokenExpiresAt):null,a.scope,a.password,date(a.createdAt),date(a.updatedAt)]);
      for(const v of source.verification)await lockClient.query(`INSERT INTO verification (id,identifier,value,"expiresAt","createdAt","updatedAt") VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING`,[v.id,v.identifier,v.value,date(v.expiresAt),date(v.createdAt),date(v.updatedAt)]);
      for(const s of source.session)await lockClient.query(`INSERT INTO session (id,"expiresAt",token,"createdAt","updatedAt","ipAddress","userAgent","userId","impersonatedBy") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id) DO NOTHING`,[s.id,date(s.expiresAt),s.token,date(s.createdAt),date(s.updatedAt),s.ipAddress,s.userAgent,s.userId,s.impersonatedBy]);
      for(const e of source.enquiries)await lockClient.query(`INSERT INTO enquiries (id,created_at,status,intent,service,project_type,full_name,company,role,email,phone,location,preferred_contact,details) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) ON CONFLICT (id) DO NOTHING`,[e.id,date(e.createdAt),e.status,e.intent,e.service,e.projectType,e.fullName,e.company,e.role,e.email,e.phone,e.location,e.preferredContact,json(e.details)]);
      const pending=[...source.folders];while(pending.length){const index=pending.findIndex((f)=>!f.parentId||!pending.some((p)=>p.id===f.parentId));if(index<0)throw new Error("Folder hierarchy contains a cycle.");const [f]=pending.splice(index,1);await lockClient.query(`INSERT INTO folders (id,name,parent_id,created_by,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING`,[f.id,f.name,f.parentId,f.createdBy,date(f.createdAt),date(f.updatedAt)]);}
      await verifyCounts(lockClient);
      await lockClient.query("INSERT INTO storage_migrations (migration_key,source_fingerprint,details) VALUES ($1,$2,$3)",["sqlite-structured-v1",fingerprint,JSON.stringify({...Object.fromEntries(Object.entries(source).map(([k,v])=>[k,v.length])),documents:"intentionally excluded",r2ObjectsCreated:0})]);
      await lockClient.query("COMMIT");console.log("Migration completed and destination counts verified.");
    }catch(error){await lockClient.query("ROLLBACK");throw error;}
  }
}finally{await lockClient.query("SELECT pg_advisory_unlock($1)",[762026001]).catch(()=>{});lockClient.release();await pool.end();sqlite.close();}
