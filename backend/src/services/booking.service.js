const bookingRepository = require('../repositories/booking.repository');
const roomRepository = require('../repositories/room.repository');
const { AppError } = require('../utils/errors');

async function createBooking(userId, payload) {
  const room = await roomRepository.findById(payload.roomId);
  if (!room) throw new AppError('Room not found', 404);
  if (payload.guests > room.maxGuests) throw new AppError('Guests exceed room capacity', 400);

  const checkIn = new Date(payload.checkIn);
  const checkOut = new Date(payload.checkOut);
  if (checkOut <= checkIn) throw new AppError('Invalid check-in/check-out', 400);

  const overlap = await bookingRepository.hasOverlappingBooking(payload.roomId, checkIn, checkOut);
  if (overlap) throw new AppError('Room is not available for selected dates', 400);

  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const totalPrice = Number(room.price) * nights;

  return bookingRepository.create({
    userId,
    roomId: payload.roomId,
    checkIn,
    checkOut,
    guests: payload.guests,
    totalPrice
  });
}

async function cancelBooking(userId, id, role) {
  const booking = await bookingRepository.findById(id);
  if (!booking) throw new AppError('Booking not found', 404);
  if (role !== 'ADMIN' && booking.userId !== userId) throw new AppError('Forbidden', 403);
  return bookingRepository.cancel(id);
}

function getMyBookings(userId) { return bookingRepository.findByUser(userId); }

module.exports = { createBooking, cancelBooking, getMyBookings };
