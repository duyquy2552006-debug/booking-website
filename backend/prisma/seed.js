const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminPass = await bcrypt.hash('admin123', 10);
  const userPass = await bcrypt.hash('user12345', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@staynow.com' },
    update: {},
    create: { name: 'System Admin', email: 'admin@staynow.com', password: adminPass, role: 'ADMIN' }
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@staynow.com' },
    update: {},
    create: { name: 'Demo User', email: 'user@staynow.com', password: userPass, role: 'USER' }
  });

  const room = await prisma.room.create({
    data: {
      name: 'Deluxe Ocean View',
      type: 'Deluxe',
      price: 1800000,
      maxGuests: 2,
      description: 'Ocean view room with balcony and king size bed.',
      amenities: ['Wifi', 'TV', 'Air Conditioning'],
      status: 'AVAILABLE'
    }
  });

  await prisma.booking.create({
    data: {
      userId: user.id,
      roomId: room.id,
      checkIn: new Date('2026-06-01T14:00:00.000Z'),
      checkOut: new Date('2026-06-03T12:00:00.000Z'),
      guests: 2,
      totalPrice: 3600000,
      status: 'CONFIRMED'
    }
  });

  console.log({ admin: admin.email, user: user.email, room: room.name });
}

main().finally(() => prisma.$disconnect());
