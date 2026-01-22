const Router = require("@koa/router");
const controller = require("../controllers/conversation.controller");

const router = new Router({ prefix: "/conversations" });

router.get("/", controller.listConversations);
router.get("/:id/messages", controller.listMessages);

module.exports = router;
