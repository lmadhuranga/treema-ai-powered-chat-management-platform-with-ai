const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { routeReply } = require("../services/router.service");

async function reply(ctx) {
  const { conversationId, text } = ctx.request.body || {};

  if (!conversationId || !text) {
    ctx.throw(400, "conversationId and text are required");
  }

  const convo = await Conversation.findById(conversationId);
  if (!convo) ctx.throw(404, "Conversation not found");

  await Message.create({
    conversationId,
    channel: convo.channel,
    sender: "operator",
    content: text
  });

  await routeReply(convo, text);

  ctx.body = { status: "sent" };
}

module.exports = { reply };
