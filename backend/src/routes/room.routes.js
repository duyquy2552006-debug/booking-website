const express = require('express');
const controller = require('../controllers/room.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const permit = require('../middlewares/rbac.middleware');

const router = express.Router();

router.get('/', controller.getRooms);
router.get('/:id', controller.getRoomDetail);
router.post('/', authMiddleware, permit('ADMIN'), controller.createRoom);
router.patch('/:id', authMiddleware, permit('ADMIN'), controller.updateRoom);
router.delete('/:id', authMiddleware, permit('ADMIN'), controller.deleteRoom);

module.exports = router;
