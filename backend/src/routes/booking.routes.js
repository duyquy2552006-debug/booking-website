const express = require('express');
const controller = require('../controllers/booking.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { createBookingSchema, bookingIdSchema } = require('../validators/booking.validator');

const router = express.Router();

router.get('/me', authMiddleware, controller.getMyBookings);
router.post('/', authMiddleware, validate(createBookingSchema), controller.createBooking);
router.patch('/:id/cancel', authMiddleware, validate(bookingIdSchema), controller.cancelBooking);

module.exports = router;
