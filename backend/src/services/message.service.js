const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

async function saveIncomingMessage(normalized) {
  if (!normalized || !normalized.guestKey || !normalized.channel) {
    throw new Error("Invalid normalized message payload");
  }

  let convo = await Conversation.findOne({
    guestKey: normalized.guestKey,
    channel: normalized.channel
  });

  if (!convo) {
    convo = await Conversation.create({
      tenantId: normalized.tenantId,
      guestKey: normalized.guestKey,
      channel: normalized.channel,
      lastMessageAt: new Date()
    });
  }

  const message = await Message.create({
    conversationId: convo._id,
    channel: normalized.channel,
    sender: "guest",
    externalMessageId: normalized.externalMessageId,
    content: normalized.content,
    metadata: normalized.metadata
  });

  convo.lastMessageAt = message.createdAt;
  if (normalized.metadata) {
    // Persist analysis summary onto the conversation for quick inbox rendering.
    const { intent, sentiment, sentiment_score, priority_score, priority_level } =
      normalized.metadata;
    if (intent && !convo.intent) convo.intent = intent;
    if (sentiment && !convo.sentiment) convo.sentiment = sentiment;
    if (sentiment_score !== undefined && convo.sentimentScore === undefined) {
      convo.sentimentScore = sentiment_score;
    }
    if (priority_score !== undefined && convo.priorityScore === undefined) {
      convo.priorityScore = priority_score;
    }
    if (priority_level && !convo.priorityLevel) {
      convo.priorityLevel = priority_level;
    }
  }
  await convo.save();

  return { convo, message };
}

module.exports = { saveIncomingMessage };
