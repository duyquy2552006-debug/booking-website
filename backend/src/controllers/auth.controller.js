const authService = require('../services/auth.service');
const { success } = require('../utils/api-response');

async function register(req, res, next) {
  try { return res.status(201).json(success(await authService.register(req.body), 'Register successful')); } catch (e) { return next(e); }
}

async function login(req, res, next) {
  try { return res.status(200).json(success(await authService.login(req.body), 'Login successful')); } catch (e) { return next(e); }
}

module.exports = { register, login };
