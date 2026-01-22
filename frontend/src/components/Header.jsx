export default function Header({ apiBase }) {
  return (
    <header className="flex items-center justify-between rounded-3xl border border-amber-200/60 bg-white/70 px-6 py-4 shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-orange-500/80">
          Treema Inbox
        </p>
        <h1 className="text-2xl font-semibold">Unified Operator Desk</h1>
      </div>
      <div className="text-right text-xs text-slate-500">
        <p>{apiBase}</p>
      </div>
    </header>
  );
}
