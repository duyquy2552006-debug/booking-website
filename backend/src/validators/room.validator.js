const { z } = require('zod');

const roomBody = z.object({
  name: z.string().min(2),
  type: z.string().min(2),
  price: z.coerce.number().positive(),
  maxGuests: z.coerce.number().int().positive(),
  description: z.string().min(10),
  amenities: z.array(z.string()).default([]),
  status: z.enum(['AVAILABLE', 'BOOKED', 'MAINTENANCE']).optional()
});

const createRoomSchema = z.object({ body: roomBody, query: z.object({}), params: z.object({}) });
const updateRoomSchema = z.object({ body: roomBody.partial(), query: z.object({}), params: z.object({ id: z.string().min(1) }) });
const roomIdSchema = z.object({ body: z.object({}), query: z.object({}), params: z.object({ id: z.string().min(1) }) });
const roomQuerySchema = z.object({
  body: z.object({}),
  params: z.object({}),
  query: z.object({
    search: z.string().optional(),
    type: z.string().optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    guests: z.coerce.number().optional(),
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10)
  })
});

module.exports = { createRoomSchema, updateRoomSchema, roomIdSchema, roomQuerySchema };
