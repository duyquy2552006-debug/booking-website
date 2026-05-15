const { z } = require('zod');
const roomRepository = require('../repositories/room.repository');
const AppError = require('../utils/app-error');
const { ok } = require('../utils/api-response');

const roomInputSchema = z.object({
  name: z.string().min(2),
  type: z.string().min(2),
  price: z.coerce.number().positive(),
  maxGuests: z.coerce.number().int().positive(),
  description: z.string().min(10),
  amenities: z.array(z.string()).default([]),
  status: z.enum(['AVAILABLE', 'BOOKED', 'MAINTENANCE']).default('AVAILABLE')
});

async function createRoom(req, res, next) {
  try {
    const room = await roomRepository.createRoom(roomInputSchema.parse(req.body));
    return ok(res, room, 'Room created', 201);
  } catch (e) { next(e); }
}

async function updateRoom(req, res, next) {
  try {
    const room = await roomRepository.updateRoom(req.params.id, roomInputSchema.partial().parse(req.body));
    return ok(res, room, 'Room updated');
  } catch (e) { next(e); }
}

async function deleteRoom(req, res, next) {
  try {
    await roomRepository.deleteRoom(req.params.id);
    return ok(res, null, 'Room deleted');
  } catch (e) { next(e); }
}

async function getRoomDetail(req, res, next) {
  try {
    const room = await roomRepository.findRoomById(req.params.id);
    if (!room) throw new AppError('Room not found', 404);
    return ok(res, room);
  } catch (e) { next(e); }
}

async function getRooms(req, res, next) {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const [total, rooms] = await roomRepository.findRooms({
      page,
      limit,
      type: req.query.type,
      status: req.query.status,
      search: req.query.search,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined
    });
    return ok(res, { items: rooms, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (e) { next(e); }
}

module.exports = { createRoom, updateRoom, deleteRoom, getRoomDetail, getRooms };
