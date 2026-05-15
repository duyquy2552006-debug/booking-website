const { z } = require('zod');
const prisma = require('../config/prisma');
const bookingRepository = require('../repositories/booking.repository');
const AppError = require('../utils/app-error');
const { ok } = require('../utils/api-response');

const createSchema = z.object({
  roomId: z.string().min(1),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  guests: z.coerce.number().int().positive()
});

async function createBooking(req, res, next) {
  try {
    const data = createSchema.parse(req.body);
    if (data.checkOut <= data.checkIn) throw new AppError('Invalid date range', 400);

    const room = await prisma.room.findUnique({ where: { id: data.roomId } });
    if (!room) throw new AppError('Room not found', 404);
    if (data.guests > room.maxGuests) throw new AppError('Guests exceed max capacity', 400);

    const overlap = await bookingRepository.findOverlappingBooking(data.roomId, data.checkIn, data.checkOut);
    if (overlap) throw new AppError('Room is not available in selected period', 409);

    const nights = Math.ceil((data.checkOut - data.checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = Number(room.price) * nights;

    const booking = await bookingRepository.createBooking({
      roomId: data.roomId,
      userId: req.user.userId,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      totalPrice,
      status: 'PENDING'
    });

    return ok(res, booking, 'Booking created', 201);
  } catch (e) { next(e); }
}

async function cancelBooking(req, res, next) {
  try {
    const booking = await bookingRepository.findBookingById(req.params.id);
    if (!booking) throw new AppError('Booking not found', 404);
    if (booking.userId !== req.user.userId && req.user.role !== 'ADMIN') throw new AppError('Forbidden', 403);
    const result = await bookingRepository.cancelBooking(req.params.id);
    return ok(res, result, 'Booking cancelled');
  } catch (e) { next(e); }
}

async function getMyBookings(req, res, next) {
  try {
    const bookings = await bookingRepository.findBookingsByUser(req.user.userId);
    return ok(res, bookings);
  } catch (e) { next(e); }
}

async function getBookingsAdmin(req, res, next) {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const [total, items] = await bookingRepository.findBookings({ page, limit, status: req.query.status });
    return ok(res, { items, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (e) { next(e); }
}

module.exports = { createBooking, cancelBooking, getMyBookings, getBookingsAdmin };
