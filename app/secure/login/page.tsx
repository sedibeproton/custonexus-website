"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function SecureLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const result = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message || "Invalid email or password.");
      return;
    }

    router.push("/secure/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-slate-900 shadow-2xl">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
          <LockKeyhole size={26} strokeWidth={2} />
        </div>

        <h1 className="text-3xl font-bold">
          CustoNexus Secure Archive
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          This area is restricted to authorised CustoNexus personnel.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@custonexus.com"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-500">
          Private company archive - Authorised access only
        </p>
      </div>
    </main>
  );
}
