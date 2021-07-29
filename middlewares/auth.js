const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  try {
    const token = req.cookies.JWT;

    if (!token) {
      throw new UnauthorizedError('Пожалуйста зарегестрируйтесь');
    }

    req.user = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );

    return next();
  } catch (err) {
    throw new UnauthorizedError('Неверный токен');
  }
};

module.exports = { auth };
