const express = require('express');
const authRoutes = require('./auth.routes');
const roomRoutes = require('./room.routes');
const bookingRoutes = require('./booking.routes');
const adminRoutes = require('./admin.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
