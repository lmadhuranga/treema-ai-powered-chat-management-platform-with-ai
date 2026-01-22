const Koa = require("koa");
const Router = require("@koa/router");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");
require("dotenv").config();
const rateLimit = require("./middleware/rateLimit");
const webhookRoutes = require("./routes/webhook.routes");
const replyRoutes = require("./routes/reply.routes");
const conversationRoutes = require("./routes/conversation.routes");
const authRoutes = require("./routes/auth.routes");

const app = new Koa();
app.proxy = true;
const router = new Router();

async function ensureDbConnected() {
  const mongoUri = process.env.chat_manager_MONGODB_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    return;
  }
  const readyState = mongoose.connection.readyState;
  if (readyState === 1 || readyState === 2) {
    return;
  }
  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

router.get("/health", (ctx) => {
  const readyState = mongoose.connection.readyState;
  const dbStatus = readyState === 1 ? "connected" : "disconnected";
  ctx.body = { status: "ok", db: dbStatus };
});

router.get("/", (ctx) => {
  ctx.body = { message: "hello koa backend" };
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
  })
);
app.use(async (ctx, next) => {
  await ensureDbConnected();
  await next();
});
app.use(rateLimit());
app.use(bodyParser());
app.use(webhookRoutes.routes()).use(webhookRoutes.allowedMethods());
app.use(replyRoutes.routes()).use(replyRoutes.allowedMethods());
app.use(conversationRoutes.routes()).use(conversationRoutes.allowedMethods());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

async function start() {
  const mongoUri = process.env.chat_manager_MONGODB_URI || process.env.MONGODB_URI;
  if (mongoUri) {
    const redactedUri = mongoUri.replace(/\/\/([^@]+)@/, "//****:****@");
    console.log(`MONGODB_URI=${redactedUri}`);
    try {
      await mongoose.connect(mongoUri);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
    }
  } else {
    console.warn(
      `MONGODB_URI not set; skipping database connection (NODE_ENV=${process.env.NODE_ENV || "unset"})`
    );
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Unified inbox API listening on http://localhost:${port}`);
  });
}

const handler = app.callback();
handler.app = app;
handler.start = start;

if (require.main === module) {
  start();
}

module.exports = handler;
