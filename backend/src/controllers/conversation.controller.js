const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

async function listConversations(ctx) {
  const limit = Math.min(Number(ctx.query.limit) || 5, 200);
  const offset = Math.max(Number(ctx.query.offset) || 0, 0);
  const items = await Conversation.find()
    .sort({ lastMessageAt: -1 })
    .skip(offset)
    .limit(limit)
    .lean();

  ctx.body = { items };
}

async function listMessages(ctx) {
  const { id } = ctx.params;
  const limit = Math.min(Number(ctx.query.limit) || 5, 200);

  const items = await Message.find({ conversationId: id })
    .sort({ createdAt: 1 })
    .limit(limit)
    .lean();

  ctx.body = { items };
}

module.exports = { listConversations, listMessages };
