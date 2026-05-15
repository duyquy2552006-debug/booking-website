const bookingService = require('../services/booking.service');
const { success } = require('../utils/api-response');

async function createBooking(req, res, next) {
  try { return res.status(201).json(success(await bookingService.createBooking(req.user.userId, req.body), 'Booking created')); } catch (e) { return next(e); }
}

async function cancelBooking(req, res, next) {
  try { return res.json(success(await bookingService.cancelBooking(req.user.userId, req.params.id, req.user.role), 'Booking cancelled')); } catch (e) { return next(e); }
}

async function getMyBookings(req, res, next) {
  try { return res.json(success(await bookingService.getMyBookings(req.user.userId))); } catch (e) { return next(e); }
}

module.exports = { createBooking, cancelBooking, getMyBookings };
