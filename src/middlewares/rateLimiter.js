const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000000,
  max: 80,
  skipSuccessfulRequests: true,
});

module.exports = {
  authLimiter,
};

