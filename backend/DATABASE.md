# Zoo Beauty Palace - Database Setup

This guide will help you set up and configure the PostgreSQL database for the Zoo Beauty Palace backend.

## Prerequisites

- PostgreSQL installed on your system
- Node.js and npm installed

## Database Configuration

1. **Start PostgreSQL Service**
   - Windows: PostgreSQL should start automatically, or use Services panel
   - Verify it's running on port 5432 (default)

2. **Create Database**
   ```bash
   # Connect to PostgreSQL as postgres user
   psql -U postgres
   
   # Create the database
   CREATE DATABASE zoo_beauty;
   
   # Exit psql
   \q
   ```

3. **Configure Environment Variables**
   
   The `.env` file is already configured with default settings:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=zoo_beauty
   DB_USER=postgres
   DB_PASSWORD=postgres
   ```
   
   Update these values if your PostgreSQL configuration is different.

## Initialize Database

Run these commands from the `backend` directory:

```bash
# Initialize the database schema (creates all tables, indexes, and triggers)
npm run db:init

# Seed the database with sample data
npm run db:seed

# Or do both at once
npm run db:reset
```

## Database Structure

The database includes the following tables:

### Core Tables
- **users** - Base user information for all user types
- **customers** - Customer-specific data (extends users)
- **providers** - Beauty service provider data (extends users)
- **beauticians** - Beautician/stylist data (extends users)
- **admins** - Admin user data (extends users)

### Business Tables
- **services** - Available beauty services
- **bookings** - Service bookings/appointments
- **payments** - Payment records
- **transactions** - Financial transaction history
- **reviews** - Customer reviews and ratings

### Supporting Tables
- **customer_favorites** - Customer's favorite services

## Features

### Automatic Triggers
- Auto-update timestamps on record modifications
- Auto-calculate service ratings from reviews
- Auto-calculate beautician ratings from reviews
- Auto-calculate provider ratings from reviews

### Data Validation
- Email format validation
- Price and duration constraints
- Time validation (end time after start time)
- Rating constraints (1-5)

### Indexes
- Optimized queries for common operations
- Fast lookups on user email, roles, bookings, reviews
- Efficient filtering by provider, service, status

## Verify Database

After initialization, you can verify the setup:

```bash
# Start the server
npm run dev

# Check health endpoint (should show database: connected)
curl http://localhost:4000/health

# Test API endpoints
curl http://localhost:4000/api/users
curl http://localhost:4000/api/services
curl http://localhost:4000/api/bookings
curl http://localhost:4000/api/reviews
```

## Sample Data

After running `db:seed`, you'll have:
- 3 users (1 customer, 1 provider, 1 beautician)
- 5 services (hair, nails, makeup, facial, massage)
- 2 bookings
- 1 review

## Troubleshooting

### Connection Issues
If you see "Database connection failed":
1. Verify PostgreSQL is running
2. Check credentials in `.env` file
3. Ensure `zoo_beauty` database exists
4. Verify firewall isn't blocking port 5432

### Permission Issues
If you get permission errors:
```bash
# Grant necessary permissions
psql -U postgres -d zoo_beauty
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
```

### Reset Database
To start fresh:
```bash
# Drop and recreate database
psql -U postgres
DROP DATABASE zoo_beauty;
CREATE DATABASE zoo_beauty;
\q

# Reinitialize
npm run db:reset
```

## API Endpoints

All endpoints support full CRUD operations with database persistence:

### Users
- `GET /api/users` - Get all users (with role filter)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Services
- `GET /api/services` - Get all services (with filters)
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Bookings
- `GET /api/bookings` - Get all bookings (with filters)
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `POST /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/stats/summary` - Get booking statistics
- `DELETE /api/bookings/:id` - Delete booking

### Reviews
- `GET /api/reviews` - Get all reviews (with filters)
- `GET /api/reviews/:id` - Get review by ID
- `POST /api/reviews` - Create new review
- `PUT /api/reviews/:id` - Update review
- `POST /api/reviews/:id/helpful` - Mark review as helpful
- `GET /api/reviews/stats/provider/:providerId` - Get provider statistics
- `DELETE /api/reviews/:id` - Delete review

## Data Flow

1. **User Registration** → Creates user record and role-specific profile
2. **Service Creation** → Provider creates services
3. **Booking Flow** → Customer books service → Assigned to beautician → Status updates
4. **Payment Processing** → Payment record created → Transaction recorded
5. **Review System** → Customer reviews completed booking → Auto-updates ratings

All operations maintain referential integrity and automatically update related records.
