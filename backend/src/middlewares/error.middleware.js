const { ZodError } = require('zod');
const { fail } = require('../utils/api-response');

function errorMiddleware(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return fail(res, 'Validation error', 422, err.flatten());
  }

  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return fail(res, message, status, err.errors || null);
}

module.exports = errorMiddleware;
