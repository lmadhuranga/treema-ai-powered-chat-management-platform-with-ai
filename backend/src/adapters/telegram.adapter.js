const https = require("https");
const { normalizeIncomingMessage } = require("../utils/normalize");

async function handleTelegramWebhook(payload) {
  // Telegram sends different update shapes; pick the message-like payloads we can normalize.
  const message = payload?.message || payload?.edited_message || payload?.channel_post;
  if (!message) {
    return null;
  }
  if (!message.text) {
    // Ignore non-text updates (stickers, photos, voice, etc.).
    return null;
  }
  // console.log(`msg_ telegram message :`, message);
  return normalizeIncomingMessage("telegram", {
    message,
    waiting_hours: payload?.waiting_hours
  });
}

async function sendTelegramReply(to, message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.warn("TELEGRAM_BOT_TOKEN is not set; skipping Telegram reply");
    return;
  }

  const payload = JSON.stringify({
    chat_id: to,
    text: message
  });

  await callTelegramApi(token, "sendMessage", payload);
  console.log("Telegram connected: reply sent");
}

// Minimal HTTPS client for Telegram Bot API calls (no extra deps).
function callTelegramApi(token, method, payload) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      hostname: "api.telegram.org",
      path: `/bot${token}/${method}`,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          return resolve(body);
        }
        reject(
          new Error(
            `Telegram API error (${res.statusCode}): ${body || "no response"}`
          )
        );
      });
    });

    req.on("error", (error) => reject(error));
    req.write(payload);
    req.end();
  });
}

module.exports = { handleTelegramWebhook, sendTelegramReply };
