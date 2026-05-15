const roomRepository = require('../repositories/room.repository');
const { AppError } = require('../utils/errors');

async function createRoom(payload) {
  return roomRepository.create(payload);
}

async function updateRoom(id, payload) {
  const existing = await roomRepository.findById(id);
  if (!existing) throw new AppError('Room not found', 404);
  return roomRepository.update(id, payload);
}

async function deleteRoom(id) {
  const existing = await roomRepository.findById(id);
  if (!existing) throw new AppError('Room not found', 404);
  await roomRepository.remove(id);
}

async function getRoomDetail(id) {
  const room = await roomRepository.findById(id);
  if (!room) throw new AppError('Room not found', 404);
  return room;
}

async function getRooms(query) {
  return roomRepository.search(query);
}

module.exports = { createRoom, updateRoom, deleteRoom, getRoomDetail, getRooms };
