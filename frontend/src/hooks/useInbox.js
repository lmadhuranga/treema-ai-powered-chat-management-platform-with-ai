import { useEffect, useState } from "react";
import syncUrl from "../utils/syncUrl.js";
import { getConversations, getMessages, sendReply } from "../services/inboxService.js";

export default function useInbox({ apiBase, starterMessage }) {
  const [conversationId, setConversationId] = useState("");
  const [text, setText] = useState(starterMessage);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingInbox, setLoadingInbox] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const pageSize = 5;

  async function fetchConversations({ reset = false } = {}) {
    if (loadingInbox || loadingMore) return;
    if (!hasMore && !reset) return;

    if (reset) {
      setLoadingInbox(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const nextOffset = reset ? 0 : offset;
      const items = await getConversations(pageSize, nextOffset);
      setConversations((prev) => (reset ? items : [...prev, ...items]));
      setOffset(nextOffset + items.length);
      setHasMore(items.length === pageSize);
    } catch (error) {
      setStatus({ ok: false, message: error.message });
    } finally {
      if (reset) {
        setTimeout(() => setLoadingInbox(false), 200);
      } else {
        setLoadingMore(false);
      }
    }
  }

  async function fetchMessages(targetId) {
    if (!targetId) return;
    setLoadingMessages(true);
    try {
      const items = await getMessages(targetId);
      setMessages(items);
      const hasOperatorReply = items.some((item) => item.sender === "operator");
      if (hasOperatorReply) {
        setText("");
      } else {
        const latestSuggested = [...items]
          .reverse()
          .find((item) => item.metadata?.suggested_replies)?.metadata
          ?.suggested_replies;
        setText(latestSuggested || starterMessage);
      }
    } catch (error) {
      setStatus({ ok: false, message: error.message });
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  }

  useEffect(() => {
    // Load initial inbox and optionally hydrate from the URL.
    fetchConversations({ reset: true });

    const params = new URLSearchParams(window.location.search);
    const initialId = params.get("conversationId");
    if (initialId) {
      setConversationId(initialId);
      fetchMessages(initialId);
    }

    function handlePopState() {
      // Keep UI in sync with browser navigation.
      const nextParams = new URLSearchParams(window.location.search);
      const nextId = nextParams.get("conversationId") || "";
      setConversationId(nextId);
      if (nextId) {
        fetchMessages(nextId);
      } else {
        setMessages([]);
      }
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  async function handleSelectConversation(conversation) {
    if (conversationId === conversation._id) return;
    setConversationId(conversation._id);
    syncUrl("conversationId", conversation._id);
    await fetchMessages(conversation._id);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);

    try {
      const body = await sendReply(conversationId, text);
      setStatus({ ok: true, message: body.status || "Reply sent" });
      await fetchMessages(conversationId);
      setText("");
    } catch (error) {
      setStatus({ ok: false, message: error.message });
    } finally {
      setBusy(false);
    }
  }

  return {
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
  };
}
