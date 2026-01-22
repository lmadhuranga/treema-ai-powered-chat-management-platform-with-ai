import ChatHistory from "./components/ChatHistory.jsx";
import ConversationList from "./components/ConversationList.jsx";
import Header from "./components/Header.jsx";
import ReplyBar from "./components/ReplyBar.jsx";
import useInbox from "./hooks/useInbox.js";
import formatTime from "./utils/formatTime.js";

const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export default function App() {
  const {
    conversationId,
    text,
    setText,
    busy,
    status,
    conversations,
    messages,
    loadingInbox,
    loadingMore,
    hasMore,
    loadingMessages,
    fetchConversations,
    handleSelectConversation,
    handleSubmit
  } = useInbox({
    apiBase,
    starterMessage: "Hi there! Thanks for reaching out. Can you share a few more details?"
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 px-4 py-6 text-slate-900">
      <div className="mx-auto flex h-[calc(100vh-48px)] max-w-6xl flex-col gap-4 pb-6">
        <Header apiBase={apiBase} />

        <div className="grid flex-1 min-h-0 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-[320px_1fr]">
          <ConversationList
            conversations={conversations}
            loading={loadingInbox}
            loadingMore={loadingMore}
            hasMore={hasMore}
            activeId={conversationId}
            onRefresh={() => fetchConversations({ reset: true })}
            onSelect={handleSelectConversation}
            onLoadMore={() => fetchConversations()}
            formatTime={formatTime}
          />

          <ChatHistory
            messages={messages}
            loading={loadingMessages}
            conversationId={conversationId}
            status={status}
            formatTime={formatTime}
          />
        </div>

        <ReplyBar
          conversationId={conversationId}
          text={text}
          busy={busy}
          onTextChange={(event) => setText(event.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
