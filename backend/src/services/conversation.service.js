const Conversation = require("../models/Conversation");

async function getConversationById(conversationId) {
  return Conversation.findById(conversationId);
}

async function touchConversation(conversationId, timestamp) {
  const when = timestamp || new Date();
  return Conversation.findByIdAndUpdate(
    conversationId,
    { lastMessageAt: when },
    { new: true }
  );
}

module.exports = { getConversationById, touchConversation };
