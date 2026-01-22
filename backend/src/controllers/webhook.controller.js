const { handleWhatsAppWebhook } = require("../adapters/whatsapp.adapter");
const { handleTelegramWebhook } = require("../adapters/telegram.adapter");
const { handleEmailWebhook } = require("../adapters/email.adapter");
const { handleWebchatWebhook } = require("../adapters/webchat.adapter");
const messageService = require("../services/message.service");
const { analyzeMessage } = require("../services/analysis.service");

async function attachAnalysis(normalized) {
  if (!normalized || !normalized.content) return normalized;
  try {
    const waitingHours =
      typeof normalized.metadata?.waiting_hours === "number"
        ? normalized.metadata.waiting_hours
        : 0;
    // Enrich inbound messages with AI analysis (non-blocking).
    const analysis = await analyzeMessage({
      message: normalized.content,
      waiting_hours: waitingHours
    });
    if (analysis) {
      normalized.metadata = { ...(normalized.metadata || {}), ...analysis };
    }
  } catch (error) {
    console.warn("Analyze request failed:", error.message);
  }
  return normalized;
}

async function whatsappWebhook(ctx) {
  let normalized = await handleWhatsAppWebhook(ctx.request.body);
  normalized = await attachAnalysis(normalized);
  await messageService.saveIncomingMessage(normalized);
  ctx.body = { status: "ok" };
}

async function telegramWebhook(ctx) {
  let normalized = await handleTelegramWebhook(ctx.request.body);
  if (!normalized) {
    ctx.body = { status: "ignored" };
    return;
  }
  console.log(`msg_ normalized`,normalized);
  normalized = await attachAnalysis(normalized);
  await messageService.saveIncomingMessage(normalized);
  ctx.body = { status: "ok" };
}

async function emailWebhook(ctx) {
  let normalized = await handleEmailWebhook(ctx.request.body);
  normalized = await attachAnalysis(normalized);
  await messageService.saveIncomingMessage(normalized);
  ctx.body = { status: "ok" };
}

async function webchatWebhook(ctx) {
  let normalized = await handleWebchatWebhook(ctx.request.body);
  normalized = await attachAnalysis(normalized);
  await messageService.saveIncomingMessage(normalized);
  ctx.body = { status: "ok" };
}

module.exports = {
  whatsappWebhook,
  telegramWebhook,
  emailWebhook,
  webchatWebhook
};
