import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { admin } from "better-auth/plugins";

import { authDatabase } from "@/lib/auth-db";
import { isInternalAdminRequest } from "@/lib/internal-admin";

export const auth = betterAuth({
  database: authDatabase,

  emailAndPassword: {
    enabled: true,
  },

  hooks: {
    before: createAuthMiddleware(async (context) => {
      if (
        context.path.startsWith("/admin/") &&
        !isInternalAdminRequest(context.headers)
      ) {
        throw new APIError("FORBIDDEN", {
          message: "Use the protected CustoNexus administration interface.",
        });
      }
    }),
  },

  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
  ],
});
