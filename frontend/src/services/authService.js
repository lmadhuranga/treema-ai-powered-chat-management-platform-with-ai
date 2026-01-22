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

export async function login(email, password) {
  return requestJson(`${apiBase}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
}

export async function me() {
  return requestJson(`${apiBase}/auth/me`);
}

export async function logout() {
  return requestJson(`${apiBase}/auth/logout`, { method: "POST" });
}
