import Link from "next/link";
import BankAccountManager from "@/components/secure/BankAccountManager";
import SecurePageHeader from "@/components/secure/SecurePageHeader";
import { requireSecurePage } from "@/lib/business/page-auth";
import { listBankAccounts } from "@/lib/business/service";

export default async function BankingSettingsPage(){await requireSecurePage(true);const accounts=await listBankAccounts(true);return <main className="min-h-screen bg-slate-100 px-3 py-5 sm:px-6 sm:py-10"><div className="mx-auto max-w-7xl"><Link href="/secure/administration" className="text-sm font-bold text-blue-700">← Administration</Link><div className="mt-5"><SecurePageHeader eyebrow="Protected settings" title="Bank accounts" description="Maintain reusable payment accounts and select the correct account on each quote or invoice."/></div><div className="mt-8"><BankAccountManager initialAccounts={accounts}/></div></div></main>}
