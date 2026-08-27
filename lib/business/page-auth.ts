import{headers}from"next/headers";import{redirect}from"next/navigation";import{getAccountAccess}from"@/lib/admin-access";
export async function requireSecurePage(admin=false){const access=await getAccountAccess(await headers());if(!access)redirect("/secure/login");if(admin&&!access.isAdmin)redirect("/secure/dashboard");return access;}
