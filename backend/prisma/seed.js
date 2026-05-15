const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.review.deleteMany();
  await prisma.roomImage.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({ data: { name: 'Admin', email: 'admin@staynow.com', password: await bcrypt.hash('123456', 10), role: 'ADMIN' } });
  const user = await prisma.user.create({ data: { name: 'John User', email: 'user@staynow.com', password: await bcrypt.hash('123456', 10), role: 'USER' } });

  const room1 = await prisma.room.create({ data: { name: 'Deluxe Ocean View', type: 'Deluxe', price: 1800000, maxGuests: 2, description: 'Ocean view deluxe room', amenities: ['Wifi', 'TV'], status: 'AVAILABLE' } });
  const room2 = await prisma.room.create({ data: { name: 'Family Suite', type: 'Suite', price: 2600000, maxGuests: 4, description: 'Large suite for family', amenities: ['Wifi', 'Pool'], status: 'AVAILABLE' } });

  await prisma.booking.create({ data: { userId: user.id, roomId: room1.id, checkIn: new Date('2026-06-01'), checkOut: new Date('2026-06-03'), guests: 2, totalPrice: 3600000, status: 'CONFIRMED' } });
  await prisma.booking.create({ data: { userId: user.id, roomId: room2.id, checkIn: new Date('2026-06-10'), checkOut: new Date('2026-06-12'), guests: 3, totalPrice: 5200000, status: 'PENDING' } });

  console.log('Seed completed');
  console.log({ adminEmail: admin.email, userEmail: user.email, password: '123456' });
}

main().finally(async () => {
  await prisma.$disconnect();
});
