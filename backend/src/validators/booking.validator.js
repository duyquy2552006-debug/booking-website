const { z } = require('zod');

const createBookingSchema = z.object({
  body: z.object({
    roomId: z.string().min(1),
    checkIn: z.string().datetime(),
    checkOut: z.string().datetime(),
    guests: z.coerce.number().int().positive()
  }),
  query: z.object({}),
  params: z.object({})
});

const bookingIdSchema = z.object({
  body: z.object({}),
  query: z.object({}),
  params: z.object({ id: z.string().min(1) })
});

module.exports = { createBookingSchema, bookingIdSchema };
