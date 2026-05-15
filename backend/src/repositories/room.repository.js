const prisma = require('../config/prisma');

function create(data) { return prisma.room.create({ data }); }
function update(id, data) { return prisma.room.update({ where: { id }, data }); }
function remove(id) { return prisma.room.delete({ where: { id } }); }
function findById(id) { return prisma.room.findUnique({ where: { id }, include: { images: true, reviews: true } }); }

async function search(filters) {
  const { search, type, minPrice, maxPrice, guests, page = 1, limit = 10 } = filters;
  const where = {
    AND: [
      search ? { OR: [{ name: { contains: search, mode: 'insensitive' } }, { description: { contains: search, mode: 'insensitive' } }] } : {},
      type ? { type } : {},
      minPrice ? { price: { gte: minPrice } } : {},
      maxPrice ? { price: { lte: maxPrice } } : {},
      guests ? { maxGuests: { gte: guests } } : {}
    ]
  };

  const [items, total] = await prisma.$transaction([
    prisma.room.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' } }),
    prisma.room.count({ where })
  ]);

  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}

module.exports = { create, update, remove, findById, search };
