export const workspaceSections = [
  { label: "Archive", href: "/secure/archive", adminOnly: false, links: [
    { label: "Files", href: "/secure/documents" }, { label: "Upload", href: "/secure/upload" }, { label: "Enquiries", href: "/secure/enquiries" },
  ] },
  { label: "Finance", href: "/secure/finance", adminOnly: false, links: [
    { label: "Clients", href: "/secure/clients" }, { label: "Quotes", href: "/secure/quotes" }, { label: "Invoices", href: "/secure/invoices" },
  ] },
  { label: "Technical", href: "/secure/technical", adminOnly: false, links: [
    { label: "New job card", href: "/secure/technical/new" },
  ] },
  { label: "Appointments", href: "/secure/appointments", adminOnly: true, links: [
    { label: "Availability", href: "/secure/appointments/availability" },
  ] },
  { label: "Administration", href: "/secure/administration", adminOnly: true, links: [
    { label: "Users", href: "/secure/users" }, { label: "Company", href: "/secure/settings/company" },
    { label: "Bank accounts", href: "/secure/settings/banking" }, { label: "Pricing", href: "/secure/administration/pricing" },
  ] },
] as const;

export const inWorkspaceRoute = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export function findWorkspaceSection(pathname: string, isAdmin: boolean) {
  return workspaceSections.find(({ href, adminOnly, links }) =>
    (!adminOnly || isAdmin) && (inWorkspaceRoute(pathname, href) || links.some((link) => inWorkspaceRoute(pathname, link.href))),
  );
}
