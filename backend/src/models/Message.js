const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, index: true },
    channel: {
      type: String,
      enum: ["whatsapp", "telegram", "email", "web"],
      required: true
    },
    sender: { type: String, enum: ["guest", "operator"], required: true },
    externalMessageId: { type: String, index: true },
    content: { type: String, required: true },
    metadata: Object
  },
  { timestamps: true }
);

messageSchema.index({ conversationId: 1, createdAt: -1 });

module.exports = mongoose.model("Message", messageSchema);
