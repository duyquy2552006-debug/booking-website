const { ZodError } = require('zod');
const { failure } = require('../utils/api-response');

function errorMiddleware(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json(failure('Validation failed', err.issues));
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json(failure(err.message, err.errors));
  }

  return res.status(500).json(failure('Internal server error'));
}

module.exports = errorMiddleware;
