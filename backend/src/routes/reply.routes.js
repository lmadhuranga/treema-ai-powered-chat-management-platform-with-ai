const Router = require("@koa/router");
const controller = require("../controllers/reply.controller");

const router = new Router({ prefix: "/reply" });

router.post("/", controller.reply);

module.exports = router;
