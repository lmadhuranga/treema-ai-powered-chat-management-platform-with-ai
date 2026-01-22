const Message = require("../models/Message");

async function createMessage(payload) {
  return Message.create(payload);
}

async function listByConversation(conversationId, limit = 50) {
  return Message.find({ conversationId })
    .sort({ createdAt: -1 })
    .limit(limit);
}

module.exports = { createMessage, listByConversation };
