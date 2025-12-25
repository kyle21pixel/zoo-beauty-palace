# 🦓 Zoo Beauty Palace - Quick Reference

## 🚀 Immediate Next Steps

1. **Install dependencies:**
   ```powershell
   npm install
   ```

2. **Start development:**
   ```powershell
   npm run dev
   ```

3. **Open applications:**
   - Client: http://localhost:3000
   - Provider: http://localhost:3001
   - Admin: http://localhost:3002
   - API: http://localhost:4000

## 📁 Key Files

### Configuration
- `package.json` - Root workspace configuration
- `tsconfig.json` - TypeScript configuration
- `.gitignore` - Git ignore rules

### Documentation
- `README.md` - Project overview
- `SETUP.md` - Detailed setup guide
- `DESIGN_SYSTEM.md` - Design system documentation
- `ROADMAP.md` - Development roadmap

### Apps
- `apps/client/` - Customer-facing app
- `apps/provider-dashboard/` - Provider dashboard
- `apps/admin-dashboard/` - Admin panel
- `backend/` - API server

### Shared Packages
- `packages/ui/` - Design system components
- `packages/types/` - TypeScript type definitions

## 🎨 Design Tokens (Quick Access)

```typescript
// Import in any component
import { colors, Button, Card, Input } from '@zoo/ui';

// Colors
colors.primary[500]    // #FF4275 (Rose)
colors.secondary[500]  // #774EAF (Plum)
colors.accent[500]     // #FFB347 (Gold)

// Components
<Button variant="primary">Book Now</Button>
<Card variant="glass">Content</Card>
<Input label="Email" placeholder="Enter email" />
```

## 🔧 Common Commands

```powershell
# Install dependencies
npm install

# Start all services
npm run dev

# Start individual services
npm run dev:client      # Port 3000
npm run dev:provider    # Port 3001
npm run dev:admin       # Port 3002
npm run dev:backend     # Port 4000

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🌐 API Endpoints

```
# Services
GET    /api/services
GET    /api/services/:id
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id

# Bookings
GET    /api/bookings
GET    /api/bookings/:id
POST   /api/bookings
PUT    /api/bookings/:id
POST   /api/bookings/:id/cancel

# Users
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id

# Reviews
GET    /api/reviews
POST   /api/reviews
```

## 📱 App Features

### Client App (localhost:3000)
✅ Browse services by category  
✅ Search and filter  
✅ View service details  
🚧 Booking flow  
🚧 Booking history  
🚧 Live tracking  
🚧 Reviews  

### Provider Dashboard (localhost:3001)
✅ Dashboard with stats  
✅ Today's bookings  
✅ Quick actions  
🚧 Service management  
🚧 Staff management  
🚧 Analytics  
🚧 Customer management  

### Admin Dashboard (localhost:3002)
✅ Platform overview  
✅ User list  
✅ Statistics  
🚧 Full user CRUD  
🚧 Service categories  
🚧 Analytics reports  
🚧 Platform settings  

## 🎯 Current Status

**Phase**: 1 Complete ✅ → Phase 2 In Progress 🚧

**Completed:**
- ✅ Project structure
- ✅ Design system
- ✅ Basic client app
- ✅ Provider dashboard
- ✅ Admin dashboard
- ✅ Backend API
- ✅ Mock data

**Next Priority:**
- 🎯 Service detail pages
- 🎯 Booking flow
- 🎯 Service management
- 🎯 User management

## ⚠️ Important Reminders

1. **NO AUTHENTICATION** - All apps are open access during development
2. **MOCK DATA** - All data resets on server restart
3. **DEV MODE** - Not production-ready yet
4. **MOBILE APP** - Beautician mobile app pending

## 🐛 Troubleshooting

**Port in use:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Dependencies issue:**
```powershell
npm cache clean --force
Remove-Item -Recurse -Force node_modules
npm install
```

**TypeScript errors:**
```powershell
npm run type-check
```

## 📚 Learn More

- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Express: https://expressjs.com
- TypeScript: https://www.typescriptlang.org

## 💡 Pro Tips

1. Save files for hot reload
2. Check browser DevTools Network tab for API calls
3. Use React DevTools for component debugging
4. Check terminal for backend logs
5. Mock data in `backend/src/data/mockData.ts`

## 🎨 Design Philosophy

- **Luxury** - Premium, elegant aesthetics
- **Modern** - Latest web technologies
- **Responsive** - Mobile-first approach
- **Accessible** - High contrast, semantic HTML
- **Performant** - Optimized for speed

## 🚀 Getting Help

1. Check `SETUP.md` for detailed setup
2. See `DESIGN_SYSTEM.md` for design guidelines
3. Review `ROADMAP.md` for future plans
4. Inspect mock data for data structures
5. Check API with `curl` or Postman

---

**Version**: 1.0.0  
**Created**: December 25, 2025  
**Status**: Development - Phase 1 Complete ✅
