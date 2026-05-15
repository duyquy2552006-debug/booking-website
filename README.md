# Booking Website (Next.js + Express + PostgreSQL + Prisma)

## 1. Project Structure

```bash
booking-website/
├── frontend/                 # Next.js + Tailwind (User UI + Admin dashboard)
├── backend/                  # Express.js + Prisma + JWT (REST API)
├── package.json              # npm workspace scripts
└── .env.example              # Root env example
```

## 2. Tech Stack

- Frontend: Next.js 14, React 18, Tailwind CSS
- Backend: Node.js, Express.js, Prisma ORM
- Database: PostgreSQL
- Auth: JWT + bcrypt

## 3. Setup nhanh

### Bước 1: Cài dependencies

```bash
npm install
```

### Bước 2: Tạo file env

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

### Bước 3: Chuẩn bị PostgreSQL

Tạo database `booking_db` trên local PostgreSQL, sau đó chỉnh `DATABASE_URL` trong `backend/.env` nếu cần.

### Bước 4: Generate Prisma Client + migrate

```bash
npm run prisma:generate -w backend
npm run prisma:migrate -w backend -- --name init
```

### Bước 5: Chạy cả frontend + backend

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/health

---

## 4. REST API cơ bản

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/rooms`
- `GET /api/bookings/me` (Bearer token)

## 5. Kiến trúc

Backend theo module rõ ràng + MVC + service/repository:

- `controllers/`
- `services/`
- `repositories/`
- `middlewares/`
- `routes/`
- `config/`
- `utils/`

Frontend theo App Router + component-based architecture.

## 6. Tính năng đã setup ở bước này

- ✅ Cấu trúc project frontend/backend hoàn chỉnh
- ✅ Next.js frontend + Tailwind CSS
- ✅ Express backend
- ✅ PostgreSQL + Prisma
- ✅ Database schema đầy đủ (Users, Rooms, Bookings, Payments, Reviews...)
- ✅ REST API cơ bản
- ✅ JWT authentication cơ bản
- ✅ Homepage hiện đại, responsive
- ✅ Admin dashboard cơ bản, responsive

## 7. Gợi ý bước tiếp theo

- Thêm CRUD Rooms/Bookings/Users cho Admin
- Thêm phân quyền Admin/User đầy đủ
- Tích hợp thanh toán VNPay/Momo
- Upload ảnh Cloudinary/S3
- Bổ sung test (unit/integration/e2e)
