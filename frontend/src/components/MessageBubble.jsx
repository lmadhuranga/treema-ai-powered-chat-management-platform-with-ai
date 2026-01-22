export default function MessageBubble({ message, timestamp }) {
  const isOperator = message.sender === "operator";
  const meta = message.metadata || {};
  const pills = [
    meta.waiting_hours > 0 && `Waiting ${meta.waiting_hours}h`,
    meta.intent && `Intent: ${meta.intent}`,
    meta.sentiment && `Sentiment: ${meta.sentiment}`,
    meta.priority_level && `Priority: ${meta.priority_level}`
  ].filter(Boolean);
  return (
    <div
      className={`max-w-[80%] rounded-2xl border px-4 py-3 text-sm ${
        isOperator
          ? "ml-auto border-orange-300 bg-orange-100 text-orange-900"
          : "border-amber-200 bg-white text-slate-900"
      }`}
    >
      <p className="leading-relaxed">{message.content}</p>
      {pills.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-700"
            >
              {pill}
            </span>
          ))}
        </div>
      ) : null}
      <span className="mt-2 block text-[10px] uppercase tracking-widest text-slate-500">
        {timestamp}
      </span>
    </div>
  );
}
