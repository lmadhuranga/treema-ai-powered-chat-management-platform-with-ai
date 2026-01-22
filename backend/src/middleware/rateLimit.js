const buckets = new Map();

function getConfig() {
  const max = Number(process.env.RATE_LIMIT_MAX || 100);
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60 * 60 * 1000);
  return { max, windowMs };
}

function prune(now) {
  for (const [key, bucket] of buckets.entries()) {
    if (now > bucket.resetAt) {
      buckets.delete(key);
    }
  }
}

module.exports = function rateLimit() {
  return async function rateLimitMiddleware(ctx, next) {
    const { max, windowMs } = getConfig();
    const now = Date.now();

    prune(now);

    const key = ctx.ip || ctx.request.ip || "unknown";
    const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs };

    if (now > bucket.resetAt) {
      bucket.count = 0;
      bucket.resetAt = now + windowMs;
    }

    bucket.count += 1;
    buckets.set(key, bucket);

    const remaining = Math.max(max - bucket.count, 0);
    ctx.set("X-RateLimit-Limit", String(max));
    ctx.set("X-RateLimit-Remaining", String(remaining));
    ctx.set("X-RateLimit-Reset", String(bucket.resetAt));

    if (bucket.count > max) {
      ctx.status = 429;
      ctx.body = { error: "Rate limit exceeded" };
      return;
    }

    await next();
  };
};
