const prisma = require('../config/prisma');
const { ok } = require('../utils/api-response');

async function getDashboardStats(_req, res, next) {
  try {
    const [bookings, users, availableRooms, revenueAgg] = await Promise.all([
      prisma.booking.count(),
      prisma.user.count(),
      prisma.room.count({ where: { status: 'AVAILABLE' } }),
      prisma.booking.aggregate({ _sum: { totalPrice: true }, where: { status: { in: ['CONFIRMED', 'COMPLETED'] } } })
    ]);
    return ok(res, { totalBookings: bookings, totalUsers: users, availableRooms, totalRevenue: revenueAgg._sum.totalPrice || 0 });
  } catch (e) { next(e); }
}

async function getUsers(_req, res, next) {
  try {
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } });
    return ok(res, users);
  } catch (e) { next(e); }
}

module.exports = { getDashboardStats, getUsers };
