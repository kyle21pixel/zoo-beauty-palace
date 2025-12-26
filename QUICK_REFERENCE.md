# Backend Quick Reference

## 🚀 Getting Started

```bash
# 1. Navigate to backend folder
cd backend

# 2. Install dependencies (if not done)
npm install

# 3. Configure environment
# Edit .env file with your database credentials

# 4. Initialize database
npm run db:init

# 5. Seed sample data
npm run db:seed

# 6. Start development server
npm run dev
```

## 📝 Common Commands

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Compile TypeScript to JavaScript
npm run start            # Run production build
npm run type-check       # Check TypeScript types

# Database
npm run db:init          # Create database schema
npm run db:seed          # Add sample data
npm run db:reset         # Drop everything and recreate
```

## 🔌 API Endpoints

### Users
```bash
GET    /api/users              # Get all users
GET    /api/users?role=customer # Filter by role
GET    /api/users/:id          # Get specific user
POST   /api/users              # Create user
PUT    /api/users/:id          # Update user
DELETE /api/users/:id          # Delete user
```

### Services
```bash
GET    /api/services                    # Get all services
GET    /api/services?category=hair     # Filter by category
GET    /api/services?minPrice=50       # Filter by min price
GET    /api/services?maxPrice=200      # Filter by max price
GET    /api/services?search=facial     # Search by keyword
GET    /api/services/:id               # Get specific service
POST   /api/services                   # Create service
PUT    /api/services/:id               # Update service
DELETE /api/services/:id               # Delete service
```

### Bookings
```bash
GET    /api/bookings                        # Get all bookings
GET    /api/bookings?status=confirmed      # Filter by status
GET    /api/bookings?customerId=xxx        # Filter by customer
GET    /api/bookings?beauticianId=xxx      # Filter by beautician
GET    /api/bookings?providerId=xxx        # Filter by provider
GET    /api/bookings/:id                   # Get specific booking
GET    /api/bookings/stats/summary         # Get statistics
POST   /api/bookings                       # Create booking
PUT    /api/bookings/:id                   # Update booking
POST   /api/bookings/:id/cancel            # Cancel booking
DELETE /api/bookings/:id                   # Delete booking
```

### Reviews
```bash
GET    /api/reviews                            # Get all reviews
GET    /api/reviews?serviceId=xxx             # Filter by service
GET    /api/reviews?beauticianId=xxx          # Filter by beautician
GET    /api/reviews?providerId=xxx            # Filter by provider
GET    /api/reviews?minRating=4               # Filter by min rating
GET    /api/reviews/:id                       # Get specific review
GET    /api/reviews/stats/provider/:id        # Provider statistics
POST   /api/reviews                           # Create review
PUT    /api/reviews/:id                       # Update review
POST   /api/reviews/:id/helpful               # Mark as helpful
DELETE /api/reviews/:id                       # Delete review
```

## 📊 Database Tables

- `users` - Base user information
- `customers` - Customer profiles
- `providers` - Service provider profiles
- `beauticians` - Beautician profiles
- `admins` - Admin user profiles
- `services` - Beauty services catalog
- `bookings` - Service appointments
- `payments` - Payment records
- `transactions` - Transaction history
- `reviews` - Customer reviews
- `customer_favorites` - Favorite services

## 🧪 Testing with cURL

```bash
# Health check
curl http://localhost:4000/health

# Get all users
curl http://localhost:4000/api/users

# Get all services
curl http://localhost:4000/api/services

# Create a new user (POST with JSON)
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","firstName":"Test","lastName":"User","phone":"123-456-7890","role":"customer"}'

# Update a service (PUT with JSON)
curl -X PUT http://localhost:4000/api/services/SERVICE_ID \
  -H "Content-Type: application/json" \
  -d '{"price":99.99}'

# Cancel a booking
curl -X POST http://localhost:4000/api/bookings/BOOKING_ID/cancel
```

## 🔒 Environment Variables

```env
# Server
PORT=4000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zoo_beauty
DB_USER=postgres
DB_PASSWORD=postgres

# CORS (comma-separated)
CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002
```

## 🐛 Common Issues

### Database Connection Failed
```bash
# Check if PostgreSQL is running
Get-Service postgresql-x64-18

# Verify port is listening
netstat -ano | Select-String "5432"

# Test connection
psql -U postgres -d zoo_beauty
```

### Port Already in Use
```bash
# Find process using port 4000
netstat -ano | findstr :4000

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or change PORT in .env file
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📚 File Structure

```
backend/
├── src/
│   ├── db/                    # Database layer
│   │   ├── schema.sql        # Database schema
│   │   ├── connection.ts     # Connection pool
│   │   ├── init.ts          # Initialize DB
│   │   └── seed.ts          # Seed data
│   ├── repositories/         # Data access layer
│   │   ├── UserRepository.ts
│   │   ├── ServiceRepository.ts
│   │   ├── BookingRepository.ts
│   │   └── ReviewRepository.ts
│   ├── routes/              # API routes
│   │   ├── users.ts
│   │   ├── services.ts
│   │   ├── bookings.ts
│   │   └── reviews.ts
│   └── server.ts            # Main server
├── .env                     # Environment config
└── package.json            # Dependencies
```

## 🎯 Sample Data (after seeding)

- **Users**: 3 (1 customer, 1 provider, 1 beautician)
- **Services**: 5 (hair, nails, makeup, facial, massage)
- **Bookings**: 2 (1 completed, 1 pending)
- **Reviews**: 1 (5-star review)

## 💡 Tips

1. **Use the health endpoint** to verify database connection
2. **Check server logs** for query execution times
3. **Use repository methods** for all database operations
4. **Database triggers** automatically update ratings
5. **Connection pool** handles concurrent requests efficiently
6. **Error responses** include helpful messages for debugging

## 🔗 Documentation

- [BACKEND_COMPLETE.md](BACKEND_COMPLETE.md) - Complete implementation summary
- [DATABASE.md](backend/DATABASE.md) - Full database documentation
- [POSTGRES_SETUP.md](backend/POSTGRES_SETUP.md) - PostgreSQL setup guide

## ⚡ Quick Test Sequence

```bash
# 1. Start server
npm run dev

# 2. In another terminal, test all endpoints
curl http://localhost:4000/health
curl http://localhost:4000/api/users
curl http://localhost:4000/api/services
curl http://localhost:4000/api/bookings
curl http://localhost:4000/api/reviews

# All should return JSON with success: true
```

## 🎉 You're Ready!

The backend is fully configured with PostgreSQL integration. All data operations are persistent and production-ready.
