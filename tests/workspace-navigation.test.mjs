import assert from "node:assert/strict";
import { test } from "node:test";
import { findWorkspaceSection } from "../components/secure/workspace-sections.ts";

test("workspace detail routes retain the correct area", () => {
  for (const [path, area] of [
    ["/secure/documents/file-1", "Archive"],
    ["/secure/upload", "Archive"],
    ["/secure/quotes/new", "Finance"],
    ["/secure/invoices/invoice-1", "Finance"],
    ["/secure/technical/jobs/job-1", "Technical"],
    ["/secure/appointments/availability", "Appointments"],
    ["/secure/settings/company", "Administration"],
    ["/secure/administration/pricing", "Administration"],
  ]) assert.equal(findWorkspaceSection(path, true)?.label, area);
  assert.equal(findWorkspaceSection("/secure/documents-other", true), undefined);
});

test("restricted area navigation is omitted for ordinary users", () => {
  for (const path of ["/secure/users", "/secure/settings/banking", "/secure/appointments/availability"]) {
    assert.equal(findWorkspaceSection(path, false), undefined);
  }
  assert.equal(findWorkspaceSection("/secure/finance", false)?.label, "Finance");
});
