const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 200,
  message: 'Слишком много запросов с Вашего IP, попробуйте позже',
});

module.exports = { apiLimiter };
