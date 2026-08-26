import Database from "better-sqlite3";

const db = new Database("./sqlite.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS enquiries (
    id TEXT PRIMARY KEY,
    createdAt TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    intent TEXT NOT NULL,
    service TEXT NOT NULL,
    projectType TEXT,
    fullName TEXT NOT NULL,
    company TEXT NOT NULL,
    role TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT,
    preferredContact TEXT NOT NULL,
    details TEXT NOT NULL
  )
`);

export type NewEnquiry = {
  id: string;
  createdAt: string;
  intent: string;
  service: string;
  projectType: string | null;
  fullName: string;
  company: string;
  role: string | null;
  email: string;
  phone: string;
  location: string | null;
  preferredContact: string;
  details: string;
};

export type EnquiryRecord = NewEnquiry & { status: string };

export function insertEnquiry(enquiry: NewEnquiry) {
  db.prepare(`
    INSERT INTO enquiries (id, createdAt, intent, service, projectType, fullName, company, role, email, phone, location, preferredContact, details)
    VALUES (@id, @createdAt, @intent, @service, @projectType, @fullName, @company, @role, @email, @phone, @location, @preferredContact, @details)
  `).run(enquiry);
}

export function getEnquiries(): EnquiryRecord[] {
  return db.prepare("SELECT * FROM enquiries ORDER BY createdAt DESC").all() as EnquiryRecord[];
}
