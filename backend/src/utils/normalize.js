function normalizeIncomingMessage(channel, payload) {
  const baseMetadata =
    payload && typeof payload === "object" && payload.waiting_hours !== undefined
      ? { waiting_hours: payload.waiting_hours }
      : undefined;

  switch (channel) {
    case "whatsapp":
      return {
        guestKey: payload.from,
        externalMessageId: payload.id,
        content: payload.text,
        metadata: baseMetadata,
        channel
      };

    case "telegram":
      return {
        guestKey: payload.message.chat.id,
        externalMessageId: payload.message.message_id,
        content: payload.message.text,
        metadata: baseMetadata,
        channel
      };

    case "email":
      return {
        guestKey: payload.from,
        externalMessageId: payload.messageId,
        content: payload.body,
        metadata: baseMetadata,
        channel
      };

    case "web":
      return {
        guestKey: payload.visitorId,
        externalMessageId: payload.id,
        content: payload.text,
        metadata: baseMetadata,
        channel
      };

    default:
      throw new Error(`Unsupported channel: ${channel}`);
  }
}

module.exports = { normalizeIncomingMessage };
