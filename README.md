# Booking Website Fullstack

## Cấu trúc
- `frontend`: Next.js + Tailwind + React Query + Axios + Toast
- `backend`: Express + Prisma + PostgreSQL + JWT + RBAC

## Chạy local
1. Cài dependencies
```bash
npm install
```
2. Tạo env
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```
3. Chuẩn bị DB PostgreSQL `booking_db`.
4. Prisma migrate + seed
```bash
npm run prisma:generate -w backend
npm run prisma:migrate -w backend -- --name init
npm run prisma:seed -w backend
```
5. Run project
```bash
npm run dev
```

## Backend features
- Auth: register/login JWT
- RBAC middleware: `permit('ADMIN')`
- Rooms CRUD: create/update/delete/get detail/search/filter/pagination
- Bookings CRUD: create/cancel/my history + overlapping validation
- Admin: stats + users list
- Validation middleware + centralized error handler
- Standard API response: `{ success, message, data }`

## Frontend pages
- `/login`, `/register`
- `/rooms`, `/rooms/:id`
- `/book/:roomId`
- `/booking-history`
- `/profile`
- `/admin`, `/admin/rooms`, `/admin/bookings`, `/admin/users`

## Demo seed accounts
- Admin: `admin@staynow.com` / `admin123`
- User: `user@staynow.com` / `user12345`
