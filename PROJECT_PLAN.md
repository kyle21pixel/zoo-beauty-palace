# Zoo Beauty Palace - Project Structure Plan

## Project Overview
Zoo Beauty Palace is a beauty services platform connecting clients with beauty service providers and freelance beauticians. Functionality is similar to Uber/Bolt: clients request services either on-route (provider location) or on-site (client location with a freelancer).

## Services Offered
1. Wig Installation
2. Braiding
3. Barbering
4. Nails
5. Massage
6. Tattooing

## User Roles
1. Admin – full system control, manage users, track services, view analytics.
2. Beauty Providers – businesses providing on-route services.
3. Freelance Beauticians – independent providers for on-site services.
4. Clients – request services and track appointments.

## System Architecture
- Frontend: React.js (web)
- Backend: Node.js (Express)
- Database: MongoDB
- Authentication: JWT (to be added later)
- Payment Integration: Stripe, PayPal (to be added later)
- Real-Time Features: WebSockets (to be added later)

## Project Directory Structure
```
zoo-beauty-palace/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── providerController.js
│   │   ├── beauticianController.js
│   │   ├── clientController.js
│   │   ├── serviceController.js
│   │   ├── bookingController.js
│   │   ├── reviewController.js
│   │   └── paymentController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validator.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Provider.js
│   │   ├── Beautician.js
│   │   ├── Client.js
│   │   ├── Service.js
│   │   ├── Booking.js
│   │   ├── Review.js
│   │   ├── Payment.js
│   │   └── Notification.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── providerRoutes.js
│   │   ├── beauticianRoutes.js
│   │   ├── clientRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── paymentRoutes.js
│   ├── services/
│   │   ├── emailService.js
│   │   ├── notificationService.js
│   │   └── paymentService.js
│   ├── utils/
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── admin/
│   │   │   ├── provider/
│   │   │   ├── beautician/
│   │   │   └── client/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── provider/
│   │   │   ├── beautician/
│   │   │   └── client/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── vite.config.js
├── docs/
│   ├── API.md
│   ├── DATABASE.md
│   └── DEPLOYMENT.md
├── .gitignore
├── README.md
└── package.json (root)
```

## Database Models

### User Models
1. **Admin** - Full system control
2. **Provider** - Beauty businesses for on-route services
3. **Beautician** - Freelance beauticians for on-site services
4. **Client** - Service requesters

### Service Models
1. **Service** - Available beauty services (Wig Installation, Braiding, etc.)
2. **Booking** - Service appointments and tracking
3. **Review** - Client feedback system
4. **Payment** - Transaction records
5. **Notification** - System alerts

## Frontend Structure

### Admin Dashboard
- Purpose: Monitor the platform, manage users, services, and analytics.
- Features: Users Management, Service Management, Bookings & Requests, Analytics, Notifications
- UI/UX: Card-based layout, collapsible sidebar, interactive graphs
- Color Theme: #5A2D82 (deep violet), #F8C8DC (soft pink), #FFD166 (golden yellow)

### Beauty Providers Dashboard
- Purpose: Handle on-route services and manage bookings.
- Features: Profile Management, Booking Requests, Client Tracking, Service History, Notifications
- UI/UX: Calendar view, Map integration, Service highlights
- Color Theme: #FF6B6B (coral red), #FFE066 (soft yellow), #4ECDC4 (turquoise)

### Freelance Beautician Dashboard/App
- Purpose: Handle on-site services for client-selected freelancers.
- Features: Profile Management, Booking Requests, Client Selection, Real-Time Location Tracking, Earnings
- UI/UX: Mobile-first design, Elegant cards, Countdown timer, Chat functionality
- Color Theme: #6A4C93 (royal purple), #F1C0E8 (lavender pink), #FF9F1C (orange-gold)

### Client App/Web
- Purpose: Request services, track appointments, select providers/freelancers.
- Features: Service Selection, Provider/Freelancer Selection, Booking & Tracking, Payments, History & Reviews
- UI/UX: Minimalist interface, Intuitive navigation, Countdown for bookings
- Color Theme: #FF4C61 (vivid pink), #FFA69E (peach), #6A67CE (soft violet)

## API Endpoints Structure

### Admin Routes
- GET /api/admin/users - Get all users
- GET /api/admin/users/:id - Get user by ID
- POST /api/admin/users - Create user
- PUT /api/admin/users/:id - Update user
- DELETE /api/admin/users/:id - Delete user

### Provider Routes
- GET /api/providers - Get all providers
- GET /api/providers/:id - Get provider by ID
- POST /api/providers - Create provider
- PUT /api/providers/:id - Update provider profile
- GET /api/providers/bookings - Get provider bookings

### Beautician Routes
- GET /api/beauticians - Get all beauticians
- GET /api/beauticians/:id - Get beautician by ID
- POST /api/beauticians - Create beautician
- PUT /api/beauticians/:id - Update beautician profile
- GET /api/beauticians/bookings - Get beautician bookings

### Client Routes
- GET /api/clients - Get all clients
- GET /api/clients/:id - Get client by ID
- POST /api/clients - Create client
- PUT /api/clients/:id - Update client profile
- GET /api/clients/bookings - Get client bookings

### Service Routes
- GET /api/services - Get all services
- GET /api/services/:id - Get service by ID
- POST /api/services - Create service
- PUT /api/services/:id - Update service
- DELETE /api/services/:id - Delete service

### Booking Routes
- GET /api/bookings - Get all bookings
- GET /api/bookings/:id - Get booking by ID
- POST /api/bookings - Create booking
- PUT /api/bookings/:id - Update booking status
- DELETE /api/bookings/:id - Cancel booking

## Implementation Approach
1. First: Create basic backend structure without authentication
2. Second: Implement database models
3. Third: Create API routes
4. Fourth: Build frontend structure
5. Fifth: Implement UI components for each role
6. Sixth: Add authentication system (deferred)
7. Seventh: Add payment integration (deferred)
8. Eighth: Add real-time features (deferred)

## Development Phases
Phase 1: Basic structure and models
Phase 2: API routes and basic functionality
Phase 3: Frontend structure and components
Phase 4: Dashboard implementations
Phase 5: Advanced features (auth, payments, real-time)