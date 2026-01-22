const Conversation = require("../models/Conversation");

async function findByGuestAndChannel(guestKey, channel) {
  return Conversation.findOne({ guestKey, channel });
}

async function createConversation(payload) {
  return Conversation.create(payload);
}

module.exports = { findByGuestAndChannel, createConversation };
