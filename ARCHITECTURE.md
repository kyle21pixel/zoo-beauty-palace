# Zoo Beauty Palace - Backend Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT APPLICATIONS                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │   Client     │  │   Provider   │  │   Admin Dashboard       │  │
│  │ (Port 3000)  │  │  Dashboard   │  │      (Port 3002)        │  │
│  │              │  │ (Port 3001)  │  │                         │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────────────┘  │
└─────────┼──────────────────┼───────────────────┼────────────────────┘
          │                  │                   │
          └──────────────────┴───────────────────┘
                             │
                    HTTP/WebSocket
                             │
┌────────────────────────────┴────────────────────────────────────────┐
│                      BACKEND API SERVER                              │
│                      (Port 4000)                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                     Express.js Server                         │  │
│  │  ┌────────────┐  ┌────────────┐  ┌───────────────────────┐  │  │
│  │  │   CORS     │  │   JSON     │  │   Request Logging     │  │  │
│  │  │ Middleware │  │ Middleware │  │                       │  │  │
│  │  └────────────┘  └────────────┘  └───────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                             │                                       │
│  ┌──────────────────────────┴────────────────────────────────┐    │
│  │                      API ROUTES                            │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │    │
│  │  │  Users   │ │ Services │ │ Bookings │ │ Reviews  │    │    │
│  │  │ /api/    │ │ /api/    │ │ /api/    │ │ /api/    │    │    │
│  │  │ users    │ │ services │ │ bookings │ │ reviews  │    │    │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘    │    │
│  └───────┼────────────┼────────────┼────────────┼───────────┘    │
│          │            │            │            │                 │
│  ┌───────┴────────────┴────────────┴────────────┴───────────┐    │
│  │                   REPOSITORY LAYER                        │    │
│  │  ┌──────────────┐ ┌────────────────┐ ┌────────────────┐ │    │
│  │  │     User     │ │    Service     │ │    Booking     │ │    │
│  │  │  Repository  │ │   Repository   │ │   Repository   │ │    │
│  │  └──────┬───────┘ └────────┬───────┘ └────────┬───────┘ │    │
│  │         │                  │                  │          │    │
│  │  ┌──────┴──────────────────┴──────────────────┴─────┐   │    │
│  │  │              Review Repository                    │   │    │
│  │  └──────────────────────┬───────────────────────────┘   │    │
│  └─────────────────────────┼───────────────────────────────┘    │
│                            │                                     │
│  ┌─────────────────────────┴───────────────────────────────┐    │
│  │              DATABASE CONNECTION POOL                   │    │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐         │    │
│  │  │ Connection │ │ Connection │ │ Connection │  ...    │    │
│  │  │     1      │ │     2      │ │     3      │ (max 20)│    │
│  │  └────────────┘ └────────────┘ └────────────┘         │    │
│  └─────────────────────────┬───────────────────────────────┘    │
│                            │                                     │
│  ┌─────────────────────────┴───────────────────────────────┐    │
│  │              Socket.IO WebSocket Server                 │    │
│  │  • Real-time booking updates                            │    │
│  │  • Live notifications                                   │    │
│  │  • Room-based communication                             │    │
│  └─────────────────────────────────────────────────────────┘    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    PostgreSQL Protocol
                             │
┌────────────────────────────┴────────────────────────────────────────┐
│                     POSTGRESQL DATABASE                              │
│                     (Port 5432)                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                        TABLES                                 │  │
│  │  ┌─────────┐  ┌──────────┐  ┌────────────┐  ┌──────────┐   │  │
│  │  │  users  │  │customers │  │ providers  │  │beautician│   │  │
│  │  └────┬────┘  └────┬─────┘  └─────┬──────┘  └────┬─────┘   │  │
│  │       │            │              │              │          │  │
│  │  ┌────┴────────────┴──────────────┴──────────────┴──────┐  │  │
│  │  │              services, bookings, reviews             │  │  │
│  │  │              payments, transactions                  │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                        INDEXES                                │  │
│  │  • idx_users_email      • idx_services_provider              │  │
│  │  • idx_bookings_status  • idx_reviews_rating                 │  │
│  │  • 15+ indexes for optimal query performance                 │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                       TRIGGERS                                │  │
│  │  • Auto-update timestamps                                     │  │
│  │  • Auto-calculate service ratings                            │  │
│  │  • Auto-calculate beautician ratings                         │  │
│  │  • Auto-calculate provider ratings                           │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow Example: Creating a Booking

```
┌──────────┐     ┌──────────┐     ┌──────────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────▶│  Express │────▶│   Booking    │────▶│Connection│────▶│PostgreSQL│
│          │     │  Route   │     │  Repository  │     │   Pool   │     │ Database │
└──────────┘     └──────────┘     └──────────────┘     └──────────┘     └──────────┘
     │                │                    │                  │                │
     │  POST          │                    │                  │                │
     │  /api/         │  create()          │                  │                │
     │  bookings      │                    │  INSERT query    │                │
     ├───────────────▶│                    │                  │                │
     │                ├───────────────────▶│                  │                │
     │                │                    ├─────────────────▶│                │
     │                │                    │                  │  Execute       │
     │                │                    │                  │  INSERT        │
     │                │                    │                  ├───────────────▶│
     │                │                    │                  │                │
     │                │                    │                  │   Result       │
     │                │                    │                  │◀───────────────┤
     │                │                    │   Booking        │                │
     │                │                    │◀─────────────────┤                │
     │                │  Success           │                  │                │
     │                │◀───────────────────┤                  │                │
     │  JSON          │                    │                  │                │
     │  Response      │                    │                  │                │
     │◀───────────────┤                    │                  │                │
     │                │                    │                  │                │
     │                │  Socket.IO emit    │                  │                │
     │◀───────────────┤  (real-time        │                  │                │
     │                │   notification)    │                  │                │
     │                │                    │                  │                │
```

## Technology Stack

### Backend Framework
- **Express.js** - Web framework
- **Socket.IO** - WebSocket for real-time updates
- **TypeScript** - Type-safe development

### Database
- **PostgreSQL 18** - Relational database
- **pg** - PostgreSQL client for Node.js
- **Connection Pooling** - Efficient connection management

### Security & Utilities
- **bcrypt** - Password hashing
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifiers

### Development Tools
- **nodemon** - Auto-restart on changes
- **ts-node** - Execute TypeScript directly
- **TypeScript** - Type checking and compilation

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

### List Response
```json
{
  "success": true,
  "data": [ ... ],
  "total": 42
}
```

## Database Relationships

```
users (base table)
  │
  ├─── customers (1:1)
  │      └─── customer_favorites (1:N)
  │
  ├─── providers (1:1)
  │      ├─── services (1:N)
  │      └─── beauticians (1:N)
  │
  ├─── beauticians (1:1)
  │      ├─── bookings (1:N)
  │      └─── reviews (1:N)
  │
  └─── admins (1:1)

services
  ├─── bookings (1:N)
  └─── reviews (1:N)

bookings
  ├─── payments (1:1)
  └─── reviews (1:1)
```

## Performance Features

1. **Connection Pooling**: Max 20 concurrent connections
2. **Database Indexes**: 15+ indexes for fast queries
3. **Prepared Statements**: Protection against SQL injection
4. **Query Logging**: Monitor slow queries
5. **Error Handling**: Comprehensive try-catch blocks
6. **Automatic Triggers**: Database-level calculations

## Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **Input Validation**: Type checking and constraints
3. **SQL Injection Protection**: Parameterized queries
4. **CORS Configuration**: Restricted origins
5. **Error Messages**: Safe error responses (no stack traces to client)

## Scalability Considerations

1. **Repository Pattern**: Easy to swap data sources
2. **Connection Pooling**: Handle multiple concurrent requests
3. **Stateless API**: Horizontal scaling possible
4. **Database Indexes**: Optimized query performance
5. **Environment Configuration**: Easy deployment to different environments

## Monitoring & Debugging

1. **Health Endpoint**: `/health` - Check server and database status
2. **Query Logging**: All queries logged with execution time
3. **Error Logging**: Comprehensive error messages
4. **Connection Events**: Pool connection monitoring
5. **Request Logging**: All HTTP requests logged with timestamp
