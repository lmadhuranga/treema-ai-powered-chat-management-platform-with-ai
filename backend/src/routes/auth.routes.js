const Router = require("@koa/router");
const controller = require("../controllers/auth.controller");

const router = new Router({ prefix: "/auth" });

router.post("/login", controller.login);
router.get("/me", controller.me);
router.post("/logout", controller.logout);

module.exports = router;
