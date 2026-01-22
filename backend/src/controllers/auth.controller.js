const jwt = require("jsonwebtoken");

function getTokenPayload() {
  return { email: process.env.AUTH_EMAIL };
}

function getCookieOptions(ctx) {
  const isProd = process.env.NODE_ENV === "production";
  const forwardedProto = ctx?.get("x-forwarded-proto");
  const isSecure = Boolean(ctx?.request?.secure || forwardedProto === "https");
  return {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd ? isSecure : false,
    overwrite: true
  };
}

async function login(ctx) {
  const { email, password } = ctx.request.body || {};

  if (!email || !password) {
    ctx.throw(400, "email and password are required");
  }

  if (email !== process.env.AUTH_EMAIL || password !== process.env.AUTH_PASSWORD) {
    ctx.throw(401, "Invalid credentials");
  }

  const token = jwt.sign(getTokenPayload(), process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  ctx.cookies.set("auth_token", token, getCookieOptions(ctx));
  ctx.body = { status: "ok" };
}

async function me(ctx) {
  const token = ctx.cookies.get("auth_token");
  if (!token) ctx.throw(401, "Unauthorized");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    ctx.body = { email: payload.email };
  } catch (error) {
    ctx.throw(401, "Unauthorized");
  }
}

async function logout(ctx) {
  ctx.cookies.set("auth_token", "", { ...getCookieOptions(ctx), maxAge: 0 });
  ctx.body = { status: "ok" };
}

module.exports = { login, me, logout };
