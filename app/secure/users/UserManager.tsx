"use client";

import { FormEvent, useState } from "react";

type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isFounder: boolean;
  createdAt: string;
};

async function readResponse(response: Response) {
  const data = (await response.json()) as { error?: string; users?: ManagedUser[] };
  if (!response.ok) throw new Error(data.error ?? "The request could not be completed.");
  return data;
}

export default function UserManager({ currentUserId, initialUsers }: { currentUserId: string; initialUsers: ManagedUser[] }) {
  const [users, setUsers] = useState<ManagedUser[]>(initialUsers);
  const [busyUserId, setBusyUserId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadUsers() {
    try {
      const response = await fetch("/api/admin/users", { cache: "no-store" });
      const data = await readResponse(response);
      setUsers(data.users ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load users.");
    }
  }

  function clearStatus() {
    setMessage("");
    setError("");
  }

  async function createUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearStatus();
    setBusyUserId("create");

    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          role: formData.get("role"),
        }),
      });
      await readResponse(response);
      form.reset();
      setMessage("User created successfully.");
      await loadUsers();
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Unable to create user.");
    } finally {
      setBusyUserId("");
    }
  }

  async function changeRole(user: ManagedUser, role: ManagedUser["role"]) {
    clearStatus();
    setBusyUserId(user.id);
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, action: "role", role }),
      });
      await readResponse(response);
      setMessage(`${user.name}'s role was updated.`);
      await loadUsers();
    } catch (roleError) {
      setError(roleError instanceof Error ? roleError.message : "Unable to change role.");
    } finally {
      setBusyUserId("");
    }
  }

  async function resetPassword(event: FormEvent<HTMLFormElement>, user: ManagedUser) {
    event.preventDefault();
    clearStatus();
    setBusyUserId(user.id);
    const form = event.currentTarget;
    const password = new FormData(form).get("password");
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, action: "password", password }),
      });
      await readResponse(response);
      form.reset();
      setMessage(`${user.name}'s password was changed and active sessions were ended.`);
    } catch (passwordError) {
      setError(passwordError instanceof Error ? passwordError.message : "Unable to change password.");
    } finally {
      setBusyUserId("");
    }
  }

  async function deleteUser(user: ManagedUser) {
    if (!window.confirm(`Permanently delete ${user.name} (${user.email})?`)) return;
    clearStatus();
    setBusyUserId(user.id);
    try {
      const response = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      await readResponse(response);
      setMessage(`${user.name}'s account was deleted.`);
      await loadUsers();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete user.");
    } finally {
      setBusyUserId("");
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-slate-950">Create a user</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Users can access the secure archive. Administrators can also create and manage accounts.
        </p>

        <form onSubmit={createUser} className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            Full name
            <input name="name" required autoComplete="off" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Email address
            <input name="email" type="email" required autoComplete="off" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Temporary password
            <input name="password" type="password" minLength={12} required autoComplete="new-password" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
            <span className="mt-1 block text-xs font-normal text-slate-500">At least 12 characters.</span>
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Access role
            <select name="role" defaultValue="user" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100">
              <option value="user">User — archive access</option>
              <option value="admin">Administrator — full management</option>
            </select>
          </label>
          <button disabled={busyUserId === "create"} className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60 md:col-span-2 md:w-fit">
            {busyUserId === "create" ? "Creating user…" : "Create user"}
          </button>
        </form>
      </section>

      {(message || error) && (
        <div role="status" className={`rounded-xl border px-4 py-3 text-sm ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
          {error || message}
        </div>
      )}

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-950">Team accounts</h2>
            <p className="mt-1 text-sm text-slate-600">Manage roles, credentials and access.</p>
          </div>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">{users.length} accounts</span>
        </div>

        <div className="mt-5 grid gap-5">
            {users.map((user) => {
              const busy = busyUserId === user.id;
              return (
                <article key={user.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="break-words text-lg font-bold text-slate-950">{user.name}</h3>
                        {user.isFounder && <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">Founder · protected</span>}
                        {user.id === currentUserId && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">You</span>}
                      </div>
                      <p className="mt-1 break-all text-sm text-slate-600">{user.email}</p>
                      <p className="mt-2 text-xs text-slate-500">Created {new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium" }).format(new Date(user.createdAt))}</p>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[220px_300px_auto] xl:items-end">
                      <label className="text-sm font-semibold text-slate-700">
                        Role
                        <select value={user.role} disabled={busy || user.isFounder} onChange={(event) => void changeRole(user, event.target.value as ManagedUser["role"])} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal disabled:bg-slate-100">
                          <option value="user">User</option>
                          <option value="admin">Administrator</option>
                        </select>
                      </label>

                      <form onSubmit={(event) => resetPassword(event, user)}>
                        <label className="text-sm font-semibold text-slate-700">
                          New password
                          <div className="mt-2 flex gap-2">
                            <input name="password" type="password" minLength={12} required autoComplete="new-password" placeholder="12+ characters" className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2.5 font-normal" />
                            <button disabled={busy} className="rounded-xl border border-blue-200 px-3 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50 disabled:opacity-50">Reset</button>
                          </div>
                        </label>
                      </form>

                      <button type="button" disabled={busy || user.isFounder || user.id === currentUserId} onClick={() => void deleteUser(user)} className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40">
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
      </section>
    </div>
  );
}
