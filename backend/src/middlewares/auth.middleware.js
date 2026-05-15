const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const { AppError } = require('../utils/errors');

function authMiddleware(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return next(new AppError('Unauthorized', 401));

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return next(new AppError('Invalid token', 401));
  }
}

module.exports = authMiddleware;
