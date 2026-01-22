const Router = require("@koa/router");
const controller = require("../controllers/webhook.controller");

const router = new Router({ prefix: "/webhooks" });

router.post("/whatsapp", controller.whatsappWebhook);
router.post("/telegram", controller.telegramWebhook);
router.post("/email", controller.emailWebhook);
router.post("/webchat", controller.webchatWebhook);

module.exports = router;
