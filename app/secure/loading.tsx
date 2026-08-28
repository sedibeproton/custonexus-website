export default function SecureLoading() {
  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-slate-50 px-4 py-12 sm:px-6" aria-busy="true" aria-label="Loading secure workspace">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-4 w-40 rounded-full bg-blue-100" />
        <div className="mt-5 h-10 max-w-xl rounded-xl bg-slate-200" />
        <div className="mt-4 h-5 max-w-2xl rounded-lg bg-slate-200/80" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-64 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="h-14 w-14 rounded-2xl bg-blue-100" />
              <div className="mt-8 h-7 w-2/3 rounded-lg bg-slate-200" />
              <div className="mt-4 h-4 rounded bg-slate-100" />
              <div className="mt-2 h-4 w-4/5 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
