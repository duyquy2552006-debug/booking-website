const express = require('express');
const controller = require('../controllers/room.controller');
const auth = require('../middlewares/auth.middleware');
const { permit } = require('../middlewares/rbac.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { createRoomSchema, roomIdSchema, roomQuerySchema, updateRoomSchema } = require('../validators/room.validator');

const router = express.Router();

router.get('/', validate(roomQuerySchema), controller.getRooms);
router.get('/:id', validate(roomIdSchema), controller.getRoomDetail);
router.post('/', auth, permit('ADMIN'), validate(createRoomSchema), controller.createRoom);
router.patch('/:id', auth, permit('ADMIN'), validate(updateRoomSchema), controller.updateRoom);
router.delete('/:id', auth, permit('ADMIN'), validate(roomIdSchema), controller.deleteRoom);

module.exports = router;
