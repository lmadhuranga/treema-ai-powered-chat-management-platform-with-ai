const { normalizeIncomingMessage } = require("../utils/normalize");

async function handleWhatsAppWebhook(payload) {
  return normalizeIncomingMessage("whatsapp", payload);
}

async function sendWhatsAppReply(to, message) {
  console.log("Sending WhatsApp reply to", to, message);
}

module.exports = { handleWhatsAppWebhook, sendWhatsAppReply };
