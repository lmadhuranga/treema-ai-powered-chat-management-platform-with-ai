const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    tenantId: { type: String, index: true },
    guestKey: { type: String, index: true },
    channel: String,
    lastMessageAt: Date,
    assignedTo: String,
    intent: String,
    sentiment: String,
    sentimentScore: Number,
    priorityScore: Number,
    priorityLevel: String
  },
  { timestamps: true }
);

conversationSchema.index({ tenantId: 1, lastMessageAt: -1 });

module.exports = mongoose.model("Conversation", conversationSchema);
