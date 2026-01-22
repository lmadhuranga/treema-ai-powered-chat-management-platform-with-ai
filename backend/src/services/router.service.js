const { sendWhatsAppReply } = require("../adapters/whatsapp.adapter");
const { sendTelegramReply } = require("../adapters/telegram.adapter");
const { sendEmailReply } = require("../adapters/email.adapter");
const { sendWebchatReply } = require("../adapters/webchat.adapter");

async function routeReply(conversation, text) {
  if (!conversation) {
    throw new Error("Conversation is required for routing");
  }

  switch (conversation.channel) {
    case "whatsapp":
      return sendWhatsAppReply(conversation.guestKey, text);
    case "telegram":
      return sendTelegramReply(conversation.guestKey, text);
    case "email":
      return sendEmailReply(conversation.guestKey, text);
    case "web":
      return sendWebchatReply(conversation.guestKey, text);
    default:
      throw new Error(`Unsupported channel: ${conversation.channel}`);
  }
}

module.exports = { routeReply };
