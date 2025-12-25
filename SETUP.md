# 🚀 Zoo Beauty Palace - Setup Guide

## Quick Start

### 1. Install Dependencies

```powershell
# Install all workspace dependencies
npm install
```

### 2. Start Development Servers

#### Option A: Start All Services at Once
```powershell
npm run dev
```

This starts:
- Client App on http://localhost:3000
- Provider Dashboard on http://localhost:3001
- Admin Dashboard on http://localhost:3002
- Backend API on http://localhost:4000

#### Option B: Start Services Individually

```powershell
# Terminal 1 - Backend API
npm run dev:backend

# Terminal 2 - Client App
npm run dev:client

# Terminal 3 - Provider Dashboard
npm run dev:provider

# Terminal 4 - Admin Dashboard
npm run dev:admin
```

## 📱 Applications

### Client App (Port 3000)
**For Customers**

Features:
- ✅ Browse services by category
- ✅ Search and filter services
- ✅ View service details
- ✅ Service booking flow
- 🚧 Booking history
- 🚧 Live tracking
- 🚧 Reviews & ratings

**Quick Test:**
1. Go to http://localhost:3000
2. Click "Browse Services"
3. Filter by category or price
4. Click "Book Now" on any service

### Provider Dashboard (Port 3001)
**For Salon Owners**

Features:
- ✅ Dashboard with stats
- ✅ Today's bookings view
- ✅ Quick actions
- 🚧 Service management
- 🚧 Staff management
- 🚧 Analytics
- 🚧 Customer management

**Quick Test:**
1. Go to http://localhost:3001
2. View dashboard stats
3. See today's bookings
4. Use quick action buttons

### Admin Dashboard (Port 3002)
**For Platform Administrators**

Features:
- ✅ Platform overview
- ✅ User management interface
- ✅ Platform statistics
- 🚧 Full CRUD operations
- 🚧 Analytics & reports
- 🚧 Service categories management
- 🚧 Pricing & commission rules

**Quick Test:**
1. Go to http://localhost:3002
2. View platform statistics
3. See recent users
4. Access management tools

## 🔧 Backend API

### Base URL
`http://localhost:4000`

### Health Check
```powershell
curl http://localhost:4000/health
```

### API Endpoints

#### Services
```
GET    /api/services              # List all services
GET    /api/services/:id          # Get service by ID
POST   /api/services              # Create service
PUT    /api/services/:id          # Update service
DELETE /api/services/:id          # Delete service
```

**Query Parameters:**
- `category` - Filter by category (hair, nails, makeup, etc.)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `search` - Search in name/description

**Example:**
```powershell
curl "http://localhost:4000/api/services?category=hair&maxPrice=200"
```

#### Bookings
```
GET    /api/bookings              # List all bookings
GET    /api/bookings/:id          # Get booking by ID
POST   /api/bookings              # Create booking
PUT    /api/bookings/:id          # Update booking
POST   /api/bookings/:id/cancel   # Cancel booking
```

**Query Parameters:**
- `status` - Filter by status
- `customerId` - Filter by customer
- `beauticianId` - Filter by beautician
- `providerId` - Filter by provider

#### Users
```
GET    /api/users                 # List all users
GET    /api/users/:id             # Get user by ID
POST   /api/users                 # Create user
PUT    /api/users/:id             # Update user
```

**Query Parameters:**
- `role` - Filter by role (customer, provider, beautician, admin)

#### Reviews
```
GET    /api/reviews               # List all reviews
POST   /api/reviews               # Create review
```

**Query Parameters:**
- `serviceId` - Filter by service
- `beauticianId` - Filter by beautician
- `providerId` - Filter by provider

### WebSocket Events

The backend supports real-time updates via Socket.io:

```javascript
// Connect to WebSocket
const socket = io('http://localhost:4000');

// Join a room
socket.emit('join-room', 'booking-123');

// Listen for booking updates
socket.on('booking-status-changed', (data) => {
  console.log('Booking updated:', data);
});

// Send booking update
socket.emit('booking-update', {
  roomId: 'booking-123',
  status: 'confirmed',
});
```

## 🎨 Design System

The shared design system is in `packages/ui/` with:

### Colors
- **Primary**: Soft Rose/Blush Pink (#FF4275)
- **Secondary**: Deep Plum/Royal Purple (#774EAF)
- **Accent**: Gold/Champagne (#FFB347)

### Components
```typescript
import { Button, Card, Input } from '@zoo/ui';

// Button variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Card variants
<Card variant="default">Default</Card>
<Card variant="glass">Glassmorphism</Card>
<Card variant="elevated">Elevated</Card>
<Card variant="outlined">Outlined</Card>

// Input
<Input
  label="Email"
  placeholder="Enter email"
  leftIcon={<span>📧</span>}
/>
```

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Mono**: JetBrains Mono

## 📦 Project Structure

```
zoo-beauty/
├── apps/
│   ├── client/                    # Next.js customer app
│   ├── provider-dashboard/        # Next.js provider dashboard
│   ├── admin-dashboard/          # Next.js admin dashboard
│   └── beautician-mobile/        # React Native app (TBD)
├── packages/
│   ├── ui/                       # Shared design system
│   └── types/                    # Shared TypeScript types
├── backend/                      # Node.js/Express API
└── package.json                  # Root workspace config
```

## 🧪 Testing

### Test Services API
```powershell
# Get all services
curl http://localhost:4000/api/services

# Get services by category
curl "http://localhost:4000/api/services?category=hair"

# Create a booking
curl -X POST http://localhost:4000/api/bookings `
  -H "Content-Type: application/json" `
  -d '{
    "customerId": "u1",
    "serviceId": "s1",
    "beauticianId": "u3",
    "providerId": "u2",
    "date": "2024-12-28",
    "startTime": "10:00",
    "endTime": "11:30",
    "status": "pending",
    "price": 150,
    "paymentStatus": "pending"
  }'
```

### Test Frontend Apps

1. **Client App**: Browse services, apply filters, view details
2. **Provider Dashboard**: Check stats, view bookings
3. **Admin Dashboard**: See platform metrics, user list

## 🐛 Troubleshooting

### Port Already in Use
If ports are occupied:
```powershell
# Find process using port (e.g., 3000)
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Dependencies Not Installing
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### TypeScript Errors
```powershell
# Run type check
npm run type-check

# Type check specific app
cd apps/client
npm run type-check
```

## ⚠️ Important Notes

### No Authentication (Development Mode)

This platform is built **WITHOUT AUTHENTICATION** for development purposes:
- All routes are open
- No login/signup required
- Mock users are used throughout
- Authentication will be added after full system approval

### Mock Data

All data is in-memory and resets on server restart:
- Services: `backend/src/data/mockData.ts`
- Users: Same file
- Bookings: Same file
- Reviews: Same file

To add more mock data, edit `backend/src/data/mockData.ts`

## 🚀 Next Steps

1. ✅ Basic structure complete
2. 🚧 Add more pages to each app
3. 🚧 Implement booking flow
4. 🚧 Add beautician mobile app
5. 🚧 Connect real-time features
6. 🚧 Add charts and analytics
7. 🚧 Implement payment UI
8. ⏳ Add authentication (final phase)

## 📚 Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com
- **Socket.io Docs**: https://socket.io/docs

## 💡 Tips

1. Use browser DevTools to inspect API calls
2. Check terminal for server logs
3. Hot reload is enabled - save files to see changes
4. Use React DevTools extension for debugging
5. Check Network tab for API responses

---

**Happy Building! 🦓✨**
