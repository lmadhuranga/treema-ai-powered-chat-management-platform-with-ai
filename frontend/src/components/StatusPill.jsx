export default function StatusPill({ status }) {
  if (!status) return null;

  const tone = status.ok
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border-red-200 bg-red-50 text-red-700";

  return (
    <div className={`rounded-2xl border px-3 py-2 text-xs font-semibold ${tone}`}>
      <span className="block">{status.ok ? "Sent" : "Failed"}</span>
      <span className="block text-[10px] font-medium uppercase tracking-widest">
        {status.message}
      </span>
    </div>
  );
}
