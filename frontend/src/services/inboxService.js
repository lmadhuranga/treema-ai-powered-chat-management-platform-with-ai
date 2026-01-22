const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:3000";

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: "include",
    ...options
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = body.error || body.message || "Request failed";
    throw new Error(message);
  }
  return body;
}

export async function getConversations(limit = 5, offset = 0) {
  const body = await requestJson(
    `${apiBase}/conversations?limit=${limit}&offset=${offset}`
  );
  return body.items || [];
}

export async function getMessages(conversationId, limit = 5) {
  const body = await requestJson(
    `${apiBase}/conversations/${conversationId}/messages?limit=${limit}`
  );
  return body.items || [];
}

export async function sendReply(conversationId, text) {
  const body = await requestJson(`${apiBase}/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversationId, text })
  });
  return body;
}
