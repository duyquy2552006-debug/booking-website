const prisma = require('../config/prisma');

function create(data) { return prisma.booking.create({ data }); }
function findByUser(userId) { return prisma.booking.findMany({ where: { userId }, include: { room: true }, orderBy: { createdAt: 'desc' } }); }
function findById(id) { return prisma.booking.findUnique({ where: { id } }); }
function cancel(id) { return prisma.booking.update({ where: { id }, data: { status: 'CANCELLED' } }); }

function hasOverlappingBooking(roomId, checkIn, checkOut) {
  return prisma.booking.findFirst({
    where: {
      roomId,
      status: { in: ['PENDING', 'CONFIRMED', 'COMPLETED'] },
      NOT: [{ checkOut: { lte: checkIn } }, { checkIn: { gte: checkOut } }]
    }
  });
}

module.exports = { create, findByUser, findById, cancel, hasOverlappingBooking };
