# 🚀 Quick Start Guide - Zoo Beauty Palace

## ✅ Current Status
All applications are now connected to PostgreSQL database through the backend API. No mock data is being used.

---

## 🎯 Start Everything (Recommended Order)

### 1️⃣ Start PostgreSQL Database
- Open **pgAdmin 4**
- Ensure PostgreSQL server is running
- Verify database `zoo_beauty` exists

### 2️⃣ Initialize Database (First Time Only)
```powershell
cd backend
npm run db:init    # Creates all tables
npm run db:seed    # Adds sample data
```

### 3️⃣ Start Backend API Server
```powershell
cd backend
npm run dev
```
✅ Backend running at: **http://localhost:4000**

### 4️⃣ Start Admin Dashboard
**New Terminal:**
```powershell
cd apps\admin-dashboard
npm run dev
```
✅ Admin Dashboard at: **http://localhost:3002**

### 5️⃣ Start Provider Dashboard  
**New Terminal:**
```powershell
cd apps\provider-dashboard
npm run dev
```
✅ Provider Dashboard at: **http://localhost:3001**

### 6️⃣ Start Client App
**New Terminal:**
```powershell
cd apps\client
npm run dev
```
✅ Client App at: **http://localhost:3000**

---

## 🔍 Verify Everything Works

### Test Backend
Open: http://localhost:4000/health
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### Test Admin Dashboard
1. Open: http://localhost:3002
2. Should see dashboard with data from database
3. Check Overview, Services, Users, and Bookings tabs

### Test Provider Dashboard
1. Open: http://localhost:3001
2. Should load services, bookings, and users from database
3. All data should be from PostgreSQL

### Test Client App
1. Open: http://localhost:3000
2. Navigate to Services page
3. Should display services from database

---

## 🎨 What Changed

### ❌ Before (Old)
- Used hardcoded mock data
- `USE_MOCK_DATA=true`
- No database connection

### ✅ Now (Fixed)
- All data from PostgreSQL
- `USE_MOCK_DATA=false`
- Real-time database queries
- Proper error handling

---

## 🐛 Quick Troubleshooting

### "Failed to fetch" errors
```powershell
# Check backend is running
curl http://localhost:4000/health

# Restart backend
cd backend
npm run dev
```

### No data showing
```powershell
# Reseed database
cd backend
npm run db:seed
```

### Port already in use
```powershell
# Kill process on port (example: 4000)
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

---

## 📁 Key Configuration Files

- `backend/.env` - Database connection (USE_MOCK_DATA=false)
- `apps/admin-dashboard/.env.local` - API URL
- `apps/provider-dashboard/.env.local` - API URL  
- `apps/client/.env.local` - API URL

---

## 🎯 All API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/services` | Get all services |
| `GET /api/bookings` | Get all bookings |
| `GET /api/users` | Get all users |
| `GET /api/reviews` | Get all reviews |
| `POST /api/*` | Create new records |
| `PUT /api/*/:id` | Update records |
| `DELETE /api/*/:id` | Delete records |

---

## ✨ Summary

**Everything is ready and connected to PostgreSQL!**

1. ✅ Backend API connects to database
2. ✅ All frontend apps fetch from API
3. ✅ No mock data being used
4. ✅ Error handling in place
5. ✅ Loading states implemented

**Next Steps:**
- Add authentication (JWT tokens)
- Add authorization (role-based access)
- Add more advanced features

---

For detailed information, see [DATABASE_CONNECTION_STATUS.md](DATABASE_CONNECTION_STATUS.md)

Last Updated: December 26, 2025
