const express = require('express');
const controller = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const permit = require('../middlewares/rbac.middleware');

const router = express.Router();

router.use(authMiddleware, permit('ADMIN'));
router.get('/stats', controller.getDashboardStats);
router.get('/users', controller.getUsers);

module.exports = router;
