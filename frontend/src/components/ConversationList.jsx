import ConversationCard from "./ConversationCard.jsx";

export default function ConversationList({
  conversations,
  loading,
  loadingMore,
  hasMore,
  activeId,
  onRefresh,
  onSelect,
  onLoadMore,
  formatTime
}) {
  function handleScroll(event) {
    if (!hasMore || loadingMore || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 80) {
      onLoadMore();
    }
  }

  return (
    <section className="flex h-full min-h-0 flex-col gap-4 rounded-3xl border border-amber-200/60 bg-white/70 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
            Conversations
          </h2>
          <p className="text-xs text-slate-500">Latest activity</p>
        </div>
        <button
          className={`rounded-full border border-amber-200 px-3 py-1 text-xs font-semibold text-slate-700 transition-all duration-300 ${
            loading ? "w-32" : "w-24"
          } hover:border-orange-300 hover:text-orange-600`}
          type="button"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div
        onScroll={handleScroll}
        className={`flex-1 space-y-3 overflow-y-auto pr-1 transition-opacity duration-500 delay-150 ${
          loading ? "opacity-60" : "opacity-100"
        }`}
      >
        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={`inbox-skeleton-${item}`}
                className="skeleton h-16 w-full rounded-2xl border border-amber-200 bg-orange-50/70"
              />
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-amber-200 px-4 py-6 text-center text-sm text-slate-500">
            No conversations yet.
          </p>
        ) : (
          conversations.map((conversation) => (
            <ConversationCard
              key={conversation._id}
              conversation={conversation}
              active={activeId === conversation._id}
              onSelect={onSelect}
              lastMessageAt={formatTime(conversation.lastMessageAt)}
            />
          ))
        )}
        {loadingMore ? (
          <div className="space-y-3">
            {[0, 1].map((item) => (
              <div
                key={`inbox-skeleton-more-${item}`}
                className="skeleton h-14 w-full rounded-2xl border border-amber-200 bg-orange-50/70"
              />
            ))}
            <p className="pt-2 text-center text-xs text-slate-500">Loading more...</p>
          </div>
        ) : hasMore ? (
          <p className="pt-2 text-center text-xs text-slate-400">
            Scroll to load more
          </p>
        ) : (
          <p className="pt-2 text-center text-xs text-slate-400">
            End of conversations
          </p>
        )}
      </div>
    </section>
  );
}
