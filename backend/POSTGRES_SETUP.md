# PostgreSQL Setup Guide for Zoo Beauty Palace

## Current Issue

Your PostgreSQL 18 service is running but not accepting TCP/IP connections. This needs to be fixed before the backend can connect to the database.

## Quick Fix Steps

### Step 1: Enable TCP/IP Connections

1. Open File Explorer and navigate to:
   ```
   C:\Program Files\PostgreSQL\18\data
   ```

2. Find and edit `postgresql.conf`:
   - Look for the line: `#listen_addresses = 'localhost'`
   - Change it to: `listen_addresses = '*'` or `listen_addresses = 'localhost'`
   - Make sure to remove the `#` at the beginning

3. Find and edit `pg_hba.conf`:
   - Add this line at the end:
   ```
   host    all             all             127.0.0.1/32            md5
   host    all             all             ::1/128                 md5
   ```

### Step 2: Restart PostgreSQL Service

Open PowerShell as Administrator and run:
```powershell
# Stop the service (requires admin)
Stop-Service -Name "postgresql-x64-18"

# Start the service
Start-Service -Name "postgresql-x64-18"

# Verify it's running
Get-Service -Name "postgresql-x64-18"
```

### Step 3: Create the Database

Once PostgreSQL is accepting connections:

```powershell
# Add PostgreSQL to your PATH for this session
$env:Path = "C:\Program Files\PostgreSQL\18\bin;$env:Path"

# Connect to PostgreSQL
psql -U postgres

# In psql, create the database
CREATE DATABASE zoo_beauty;

# Exit psql
\q
```

### Step 4: Initialize the Backend Database

From the `backend` directory:

```bash
# Initialize database schema
npm run db:init

# Seed with sample data
npm run db:seed

# Or do both
npm run db:reset
```

### Step 5: Start the Server

```bash
npm run dev
```

## Alternative: pgAdmin

If you have pgAdmin installed (comes with PostgreSQL):

1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Name it `zoo_beauty`
5. Click "Save"

Then run the initialization scripts from the backend folder:
```bash
npm run db:reset
```

## Verify Everything Works

1. Start the backend server:
   ```bash
   npm run dev
   ```

2. Check the health endpoint:
   ```bash
   curl http://localhost:4000/health
   ```
   
   Should show: `"database": "connected"`

3. Test the API:
   ```bash
   # Get users
   curl http://localhost:4000/api/users

   # Get services
   curl http://localhost:4000/api/services

   # Get bookings
   curl http://localhost:4000/api/bookings
   ```

## Troubleshooting

### Still Can't Connect?

Check if PostgreSQL is listening on the network:
```powershell
netstat -ano | Select-String "5432"
```

You should see lines like:
```
TCP    127.0.0.1:5432         0.0.0.0:0              LISTENING
TCP    [::1]:5432             [::]:0                 LISTENING
```

### Wrong Password?

If you get password authentication errors, you may need to reset the postgres user password:

1. Edit `pg_hba.conf` temporarily
2. Change the authentication method to `trust` for local connections
3. Restart PostgreSQL
4. Connect and change password:
   ```sql
   ALTER USER postgres PASSWORD 'postgres';
   ```
5. Change `pg_hba.conf` back to `md5`
6. Restart PostgreSQL again

### Need Help?

Common issues:
- **Firewall blocking**: Check Windows Firewall settings
- **Wrong port**: Verify PostgreSQL is on port 5432
- **Service not running**: Check Windows Services
- **Permission issues**: Run commands as Administrator

## What Has Been Completed

✅ Backend structure with Express.js and Socket.IO
✅ Database schema with all tables (users, services, bookings, reviews, etc.)
✅ Repository pattern for clean data access
✅ All API routes updated to use PostgreSQL
✅ Database connection pooling
✅ Automatic triggers for ratings and timestamps
✅ Database initialization and seeding scripts
✅ Comprehensive error handling

## Next Steps After Database Setup

Once the database is working:

1. ✅ Test all API endpoints
2. 🔄 Add authentication (JWT)
3. 🔄 Add authorization middleware
4. 🔄 Add file upload for images
5. 🔄 Add email notifications
6. 🔄 Add payment gateway integration
7. 🔄 Add real-time notifications via WebSocket
8. 🔄 Add API rate limiting
9. 🔄 Add API documentation (Swagger)
10. 🔄 Add logging and monitoring
