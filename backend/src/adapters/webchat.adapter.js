const { normalizeIncomingMessage } = require("../utils/normalize");

async function handleWebchatWebhook(payload) {
  return normalizeIncomingMessage("web", payload);
}

async function sendWebchatReply(to, message) {
  console.log("Sending webchat reply to", to, message);
}

module.exports = { handleWebchatWebhook, sendWebchatReply };
