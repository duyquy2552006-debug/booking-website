const prisma = require('../config/prisma');

function createRoom(data) {
  return prisma.room.create({ data });
}

function updateRoom(id, data) {
  return prisma.room.update({ where: { id }, data });
}

function deleteRoom(id) {
  return prisma.room.delete({ where: { id } });
}

function findRoomById(id) {
  return prisma.room.findUnique({ where: { id }, include: { images: true, reviews: true } });
}

function findRooms({ page = 1, limit = 10, type, minPrice, maxPrice, status, search }) {
  const where = {
    ...(type ? { type } : {}),
    ...(status ? { status } : {}),
    ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
    ...(minPrice || maxPrice
      ? {
          price: {
            ...(minPrice ? { gte: minPrice } : {}),
            ...(maxPrice ? { lte: maxPrice } : {})
          }
        }
      : {})
  };

  return prisma.$transaction([
    prisma.room.count({ where }),
    prisma.room.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })
  ]);
}

module.exports = { createRoom, updateRoom, deleteRoom, findRoomById, findRooms };
