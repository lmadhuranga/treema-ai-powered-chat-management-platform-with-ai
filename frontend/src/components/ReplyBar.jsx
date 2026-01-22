export default function ReplyBar({
  conversationId,
  text,
  busy,
  onTextChange,
  onSubmit
}) {
  return (
    <form
      className="flex flex-col gap-3 rounded-3xl border border-amber-200/60 bg-white/80 px-6 py-4 shadow-sm md:flex-row md:items-center"
      onSubmit={onSubmit}
    >
      <div className="flex-1">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input type="hidden" value={conversationId} readOnly />
          <textarea
            rows="4"
            value={text}
            onChange={onTextChange}
            className="w-full flex-1 resize-none rounded-2xl border border-amber-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-orange-300"
            required
          />
        </div>
      </div>
      <button
        className="mt-2 h-12 self-end rounded-2xl bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:opacity-60 md:mt-0 md:self-end"
        type="submit"
        disabled={busy}
      >
        {busy ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
