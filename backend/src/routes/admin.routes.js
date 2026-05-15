const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { permit } = require('../middlewares/rbac.middleware');
const prisma = require('../config/prisma');
const { success } = require('../utils/api-response');

const router = express.Router();
router.use(auth, permit('ADMIN'));

router.get('/stats', async (_req, res) => {
  const [users, rooms, bookings] = await prisma.$transaction([
    prisma.user.count(),
    prisma.room.count(),
    prisma.booking.count()
  ]);

  return res.json(success({ users, rooms, bookings }));
});

router.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } });
  return res.json(success(users));
});

module.exports = router;
