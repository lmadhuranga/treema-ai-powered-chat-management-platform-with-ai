import MessageBubble from "./MessageBubble.jsx";
import StatusPill from "./StatusPill.jsx";

export default function ChatHistory({
  messages,
  loading,
  conversationId,
  status,
  formatTime
}) {
  return (
    <section className="flex h-full min-h-0 flex-col rounded-3xl border border-amber-200/60 bg-white/70 p-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
            Chat History
          </h2>
          <p className="text-xs text-slate-500">Messages and replies</p>
        </div>
        <StatusPill status={status} />
      </div>

      <div
        key={conversationId || "empty"}
        className={`fade-up flex-1 min-h-0 space-y-4 overflow-y-auto py-4 pr-1 transition-opacity duration-500 delay-150 ${
          loading ? "opacity-60" : "opacity-100"
        }`}
      >
        {loading ? (
          <div className="space-y-4">
            {[0, 1, 2, 3, 4].map((item) => (
              <div
                key={`message-skeleton-${item}`}
                className="skeleton h-14 w-4/5 rounded-2xl border border-amber-200 bg-orange-50/70"
              />
            ))}
          </div>
        ) : messages.length === 0 ? (
          <p className="text-sm text-slate-500">
            Select a conversation to view messages.
          </p>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message._id}
              message={message}
              timestamp={formatTime(message.createdAt)}
            />
          ))
        )}
      </div>
    </section>
  );
}
