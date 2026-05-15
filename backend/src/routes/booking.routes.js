const express = require('express');
const controller = require('../controllers/booking.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const permit = require('../middlewares/rbac.middleware');

const router = express.Router();

router.post('/', authMiddleware, controller.createBooking);
router.patch('/:id/cancel', authMiddleware, controller.cancelBooking);
router.get('/me', authMiddleware, controller.getMyBookings);
router.get('/', authMiddleware, permit('ADMIN'), controller.getBookingsAdmin);

module.exports = router;
