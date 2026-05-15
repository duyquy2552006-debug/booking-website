const prisma = require('../config/prisma');

function findOverlappingBooking(roomId, checkIn, checkOut) {
  return prisma.booking.findFirst({
    where: {
      roomId,
      status: { in: ['PENDING', 'CONFIRMED'] },
      NOT: [{ checkOut: { lte: checkIn } }, { checkIn: { gte: checkOut } }]
    }
  });
}

function createBooking(data) {
  return prisma.booking.create({ data, include: { room: true } });
}

function findBookingById(id) {
  return prisma.booking.findUnique({ where: { id }, include: { room: true } });
}

function cancelBooking(id) {
  return prisma.booking.update({ where: { id }, data: { status: 'CANCELLED' } });
}

function findBookingsByUser(userId) {
  return prisma.booking.findMany({ where: { userId }, include: { room: true }, orderBy: { createdAt: 'desc' } });
}

function findBookings({ page = 1, limit = 10, status }) {
  const where = status ? { status } : {};
  return prisma.$transaction([
    prisma.booking.count({ where }),
    prisma.booking.findMany({
      where,
      include: { room: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })
  ]);
}

module.exports = { findOverlappingBooking, createBooking, findBookingById, cancelBooking, findBookingsByUser, findBookings };
