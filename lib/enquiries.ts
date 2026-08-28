import Database from "better-sqlite3";
import { postgresRows } from "@/lib/db/postgres";
import { getPersistenceBackend } from "@/lib/persistence-mode";

const sqlite = getPersistenceBackend() === "sqlite" ? new Database("./sqlite.db") : null;
sqlite?.exec(`CREATE TABLE IF NOT EXISTS enquiries (id TEXT PRIMARY KEY, createdAt TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', intent TEXT NOT NULL, service TEXT NOT NULL, projectType TEXT, fullName TEXT NOT NULL, company TEXT NOT NULL, role TEXT, email TEXT NOT NULL, phone TEXT NOT NULL, location TEXT, preferredContact TEXT NOT NULL, details TEXT NOT NULL)`);
function sqliteDb(){if(!sqlite)throw new Error("SQLite persistence is disabled.");return sqlite;}

export type NewEnquiry = { id:string; createdAt:string; intent:string; service:string; projectType:string|null; fullName:string; company:string; role:string|null; email:string; phone:string; location:string|null; preferredContact:string; details:string };
export type EnquiryRecord = NewEnquiry & { status:string };
type PgEnquiry = { id:string; created_at:Date; status:string; intent:string; service:string; project_type:string|null; full_name:string; company:string; role:string|null; email:string; phone:string; location:string|null; preferred_contact:string; details:Record<string,unknown> };

function mapPg(row: PgEnquiry): EnquiryRecord { return { id:row.id, createdAt:row.created_at.toISOString(), status:row.status, intent:row.intent, service:row.service, projectType:row.project_type, fullName:row.full_name, company:row.company, role:row.role, email:row.email, phone:row.phone, location:row.location, preferredContact:row.preferred_contact, details:JSON.stringify(row.details) }; }

export async function insertEnquiry(enquiry: NewEnquiry) {
  if (getPersistenceBackend() === "postgres") {
    await postgresRows(`INSERT INTO enquiries (id,created_at,intent,service,project_type,full_name,company,role,email,phone,location,preferred_contact,details) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::jsonb)`, [enquiry.id,enquiry.createdAt,enquiry.intent,enquiry.service,enquiry.projectType,enquiry.fullName,enquiry.company,enquiry.role,enquiry.email,enquiry.phone,enquiry.location,enquiry.preferredContact,enquiry.details]);
  } else {
    sqliteDb().prepare(`INSERT INTO enquiries (id,createdAt,intent,service,projectType,fullName,company,role,email,phone,location,preferredContact,details) VALUES (@id,@createdAt,@intent,@service,@projectType,@fullName,@company,@role,@email,@phone,@location,@preferredContact,@details)`).run(enquiry);
  }
}

export async function getEnquiries(): Promise<EnquiryRecord[]> {
  if (getPersistenceBackend() === "postgres") return (await postgresRows<PgEnquiry>("SELECT * FROM enquiries ORDER BY created_at DESC")).map(mapPg);
  return sqliteDb().prepare("SELECT * FROM enquiries ORDER BY createdAt DESC").all() as EnquiryRecord[];
}

export async function deleteEnquiry(id:string){
  if(getPersistenceBackend()==="postgres")return postgresRows("DELETE FROM enquiries WHERE id=$1 RETURNING id",[id]);
  return sqliteDb().prepare("DELETE FROM enquiries WHERE id=?").run(id);
}
