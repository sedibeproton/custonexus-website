import { body, businessError, requireBusinessAccess } from "@/lib/business/api";
import { listBankAccounts, saveBankAccount } from "@/lib/business/service";

export async function GET() {
  const auth = await requireBusinessAccess();
  if ("error" in auth) return auth.error;
  return Response.json({ accounts: await listBankAccounts(auth.access.isAdmin) });
}

export async function POST(request: Request) {
  const auth = await requireBusinessAccess(true);
  if ("error" in auth) return auth.error;
  try { return Response.json({ account: await saveBankAccount(await body(request), auth.access.session.user.id) }, { status: 201 }); }
  catch (error) { return businessError(error); }
}
