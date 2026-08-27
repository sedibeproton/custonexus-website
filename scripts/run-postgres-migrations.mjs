import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import pg from "pg";

export async function runPostgresMigrations(connectionString=process.env.DATABASE_URL) {
  if(!connectionString)throw new Error("DATABASE_URL is required.");
  const pool=new pg.Pool({connectionString,ssl:connectionString.includes("localhost")?undefined:{rejectUnauthorized:false}});
  try{
    await pool.query(`CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`);
    const directory=resolve(process.cwd(),"migrations");
    const files=(await readdir(directory)).filter((name)=>name.endsWith(".sql")).sort();
    for(const name of files){
      const exists=await pool.query("SELECT 1 FROM schema_migrations WHERE name=$1",[name]);
      if(exists.rowCount){console.log(`Migration already applied: ${name}`);continue;}
      const sql=await readFile(resolve(directory,name),"utf8");
      await pool.query(sql);
      await pool.query("INSERT INTO schema_migrations (name) VALUES ($1)",[name]);
      console.log(`Applied migration: ${name}`);
    }
  }finally{await pool.end();}
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){runPostgresMigrations().catch((error)=>{console.error(`PostgreSQL migration failed: ${error.message}`);process.exitCode=1;});}
