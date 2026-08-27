import { randomUUID } from "node:crypto";

// Process-local capability used only for calls from our guarded administration
// route into Better Auth. It is never sent to the browser or stored in config.
const internalAdminToken = randomUUID();
const internalAdminHeader = "x-custonexus-internal-admin";

export function createInternalAdminHeaders(source: Headers) {
  const result = new Headers(source);
  result.set(internalAdminHeader, internalAdminToken);
  return result;
}

export function isInternalAdminRequest(headers: Headers | undefined) {
  return headers?.get(internalAdminHeader) === internalAdminToken;
}
