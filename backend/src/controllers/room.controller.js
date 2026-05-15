const roomService = require('../services/room.service');
const { success } = require('../utils/api-response');

async function getRooms(req, res, next) {
  try { return res.json(success(await roomService.getRooms(req.query))); } catch (e) { return next(e); }
}
async function getRoomDetail(req, res, next) {
  try { return res.json(success(await roomService.getRoomDetail(req.params.id))); } catch (e) { return next(e); }
}
async function createRoom(req, res, next) {
  try { return res.status(201).json(success(await roomService.createRoom(req.body), 'Room created')); } catch (e) { return next(e); }
}
async function updateRoom(req, res, next) {
  try { return res.json(success(await roomService.updateRoom(req.params.id, req.body), 'Room updated')); } catch (e) { return next(e); }
}
async function deleteRoom(req, res, next) {
  try { await roomService.deleteRoom(req.params.id); return res.json(success(null, 'Room deleted')); } catch (e) { return next(e); }
}

module.exports = { getRooms, getRoomDetail, createRoom, updateRoom, deleteRoom };
