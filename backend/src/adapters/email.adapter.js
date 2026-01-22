const { normalizeIncomingMessage } = require("../utils/normalize");

async function handleEmailWebhook(payload) {
  return normalizeIncomingMessage("email", payload);
}

async function sendEmailReply(to, message) {
  console.log("Sending email reply to", to, message);
}

module.exports = { handleEmailWebhook, sendEmailReply };
