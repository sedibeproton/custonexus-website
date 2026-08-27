import { authDb } from "@/lib/auth-db";
import { postgresRows } from "@/lib/db/postgres";
import { getPersistenceBackend } from "@/lib/persistence-mode";

export type StoredManagedUser = { id:string; name:string; email:string; emailVerified:number|boolean; role:string|null; createdAt:Date|string };

function sqliteDb(){if(!authDb)throw new Error("SQLite authentication database is unavailable.");return authDb;}

export async function listStoredUsers():Promise<StoredManagedUser[]> {
  if(getPersistenceBackend()==="postgres")return postgresRows<StoredManagedUser>('SELECT id,name,email,"emailVerified",role,"createdAt" FROM "user" ORDER BY "createdAt"');
  return sqliteDb().prepare("SELECT id,name,email,emailVerified,role,createdAt FROM user ORDER BY createdAt").all() as StoredManagedUser[];
}
export async function getStoredUser(id:string):Promise<StoredManagedUser|undefined>{
  if(getPersistenceBackend()==="postgres")return (await postgresRows<StoredManagedUser>('SELECT id,name,email,"emailVerified",role,"createdAt" FROM "user" WHERE id=$1',[id]))[0];
  return sqliteDb().prepare("SELECT id,name,email,emailVerified,role,createdAt FROM user WHERE id=?").get(id) as StoredManagedUser|undefined;
}
export async function getStoredUserByEmail(email:string):Promise<StoredManagedUser|undefined>{
  if(getPersistenceBackend()==="postgres")return (await postgresRows<StoredManagedUser>('SELECT id,name,email,"emailVerified",role,"createdAt" FROM "user" WHERE lower(email)=$1',[email.toLowerCase()]))[0];
  return sqliteDb().prepare("SELECT id,name,email,emailVerified,role,createdAt FROM user WHERE lower(email)=?").get(email.toLowerCase()) as StoredManagedUser|undefined;
}
export async function promoteStoredUser(id:string){if(getPersistenceBackend()==="postgres")await postgresRows('UPDATE "user" SET role=\'admin\',"updatedAt"=$1 WHERE id=$2',[new Date(),id]);else sqliteDb().prepare("UPDATE user SET role='admin',updatedAt=? WHERE id=?").run(Date.now(),id);}
export async function revokeStoredSessions(userId:string){if(getPersistenceBackend()==="postgres")await postgresRows('DELETE FROM "session" WHERE "userId"=$1',[userId]);else sqliteDb().prepare("DELETE FROM session WHERE userId=?").run(userId);}
