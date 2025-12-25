# 🗺️ Zoo Beauty Palace - Project Structure

## Complete File Tree

```
zoo-beauty/
│
├── 📄 package.json                    # Root workspace config
├── 📄 tsconfig.json                   # TypeScript config
├── 📄 .gitignore                      # Git ignore rules
├── 📄 README.md                       # Project overview
├── 📄 SETUP.md                        # Setup guide
├── 📄 DESIGN_SYSTEM.md               # Design documentation
├── 📄 ROADMAP.md                     # Development roadmap
├── 📄 QUICK_START.md                 # Quick reference
├── 📄 BUILD_SUMMARY.md               # What was built
├── 📄 PROJECT_STRUCTURE.md           # This file
├── 📄 START.bat                      # Quick start script
│
├── 📁 apps/                          # Applications
│   │
│   ├── 📁 client/                    # Customer App (Port 3000)
│   │   ├── 📄 package.json
│   │   ├── 📄 tsconfig.json
│   │   ├── 📄 next.config.js
│   │   └── 📁 src/
│   │       └── 📁 app/
│   │           ├── 📄 layout.tsx      # Root layout
│   │           ├── 📄 page.tsx        # Homepage
│   │           ├── 📄 globals.css     # Global styles
│   │           └── 📁 services/
│   │               └── 📄 page.tsx    # Services listing
│   │
│   ├── 📁 provider-dashboard/        # Provider Dashboard (Port 3001)
│   │   ├── 📄 package.json
│   │   ├── 📄 tsconfig.json
│   │   ├── 📄 next.config.js
│   │   └── 📁 src/
│   │       ├── 📁 app/
│   │       │   ├── 📄 layout.tsx
│   │       │   ├── 📄 page.tsx        # Dashboard
│   │       │   └── 📄 globals.css
│   │       └── 📁 components/
│   │           └── 📄 DashboardLayout.tsx
│   │
│   ├── 📁 admin-dashboard/           # Admin Dashboard (Port 3002)
│   │   ├── 📄 package.json
│   │   ├── 📄 tsconfig.json
│   │   ├── 📄 next.config.js
│   │   └── 📁 src/
│   │       └── 📁 app/
│   │           ├── 📄 layout.tsx
│   │           ├── 📄 page.tsx        # Admin dashboard
│   │           └── 📄 globals.css
│   │
│   └── 📁 beautician-mobile/         # React Native App (TBD)
│       └── 🚧 Coming soon...
│
├── 📁 packages/                      # Shared Packages
│   │
│   ├── 📁 ui/                        # Design System
│   │   ├── 📄 package.json
│   │   └── 📁 src/
│   │       ├── 📁 components/
│   │       │   ├── 📄 Button.tsx      # Button component
│   │       │   ├── 📄 Card.tsx        # Card component
│   │       │   └── 📄 Input.tsx       # Input component
│   │       ├── 📁 theme/
│   │       │   └── 📄 tokens.ts       # Design tokens
│   │       └── 📄 index.ts            # Main export
│   │
│   ├── 📁 types/                     # TypeScript Types
│   │   ├── 📄 package.json
│   │   └── 📁 src/
│   │       └── 📄 index.ts            # All type definitions
│   │
│   └── 📁 utils/                     # Utility Functions
│       ├── 📄 package.json
│       └── 📁 src/
│           └── 📄 index.ts            # Helper functions
│
└── 📁 backend/                       # API Server (Port 4000)
    ├── 📄 package.json
    ├── 📄 tsconfig.json
    ├── 📄 .env.example
    ├── 📁 src/
    │   ├── 📄 server.ts               # Main server file
    │   ├── 📁 data/
    │   │   └── 📄 mockData.ts         # Mock data
    │   └── 📁 routes/
    │       ├── 📄 services.ts         # Services endpoints
    │       ├── 📄 bookings.ts         # Bookings endpoints
    │       ├── 📄 users.ts            # Users endpoints
    │       └── 📄 reviews.ts          # Reviews endpoints
    └── 📁 dist/                       # Compiled JS (after build)
```

## Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Zoo Beauty Palace                        │
│                    Monorepo Structure                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐     ┌──────────────┐
│  Client App  │      │   Provider   │     │    Admin     │
│   (Next.js)  │      │   Dashboard  │     │   Dashboard  │
│   Port 3000  │      │  (Next.js)   │     │  (Next.js)   │
│              │      │   Port 3001  │     │   Port 3002  │
└──────────────┘      └──────────────┘     └──────────────┘
        │                     │                     │
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   Backend API    │
                    │   (Express.js)   │
                    │   Port 4000      │
                    │   + Socket.io    │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   Mock Data      │
                    │   (In-Memory)    │
                    └──────────────────┘
```

## Package Dependencies

```
┌─────────────────────────────────────────────────────────────┐
│                        Applications                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Client   │  │  Provider  │  │   Admin    │           │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘           │
│        │               │               │                    │
│        └───────────────┼───────────────┘                    │
│                        │                                     │
└────────────────────────┼─────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Shared Packages                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │    @zoo    │  │    @zoo    │  │    @zoo    │           │
│  │     ui     │  │   types    │  │   utils    │           │
│  │  (Design)  │  │ (TypeScript│  │ (Helpers)  │           │
│  └────────────┘  └────────────┘  └────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User Actions
     │
     ▼
┌──────────────┐
│  Next.js App │
│  (Frontend)  │
└──────┬───────┘
       │
       │ HTTP Request
       │ (fetch/axios)
       │
       ▼
┌──────────────┐
│  Express API │
│  (Backend)   │
└──────┬───────┘
       │
       │ Access
       │
       ▼
┌──────────────┐
│  Mock Data   │
│  (In-Memory) │
└──────────────┘
       │
       │ Response
       │
       ▼
┌──────────────┐
│  Next.js App │
│   (Update)   │
└──────────────┘
       │
       │ WebSocket
       │ (Real-time)
       │
       ▼
┌──────────────┐
│  Socket.io   │
│  (Updates)   │
└──────────────┘
```

## Component Hierarchy

### Client App
```
App Layout
├── Header
│   ├── Logo
│   ├── Navigation
│   └── CTA Button
├── Main Content
│   ├── Hero Section
│   │   ├── Heading
│   │   ├── Description
│   │   └── Action Buttons
│   ├── Categories Grid
│   │   └── Category Cards (×6)
│   ├── Featured Services
│   │   └── Service Cards (×3)
│   └── CTA Section
└── Bottom Navigation (Mobile)
    └── Nav Items (×4)
```

### Provider Dashboard
```
Dashboard Layout
├── Sidebar
│   ├── Logo
│   ├── Provider Info Card
│   └── Menu Items (×8)
└── Main Content
    ├── Header
    ├── Stats Grid (×4)
    ├── Content Grid
    │   ├── Bookings List
    │   └── Quick Actions
    └── Revenue Chart
```

### Admin Dashboard
```
Admin Layout
├── Top Bar
│   ├── Logo
│   ├── Notifications
│   └── Admin Profile
├── Tab Navigation (×7)
└── Main Content
    ├── Stats Grid (×4)
    ├── Content Grid
    │   ├── Users List
    │   └── Management Panel
    └── Activity Log
```

## API Route Structure

```
/api
├── /services
│   ├── GET    /              List all services
│   ├── GET    /:id           Get service by ID
│   ├── POST   /              Create service
│   ├── PUT    /:id           Update service
│   └── DELETE /:id           Delete service
│
├── /bookings
│   ├── GET    /              List all bookings
│   ├── GET    /:id           Get booking by ID
│   ├── POST   /              Create booking
│   ├── PUT    /:id           Update booking
│   └── POST   /:id/cancel    Cancel booking
│
├── /users
│   ├── GET    /              List all users
│   ├── GET    /:id           Get user by ID
│   ├── POST   /              Create user
│   └── PUT    /:id           Update user
│
└── /reviews
    ├── GET    /              List all reviews
    └── POST   /              Create review
```

## Design System Structure

```
@zoo/ui
├── Components
│   ├── Button
│   │   ├── Variants (5)
│   │   ├── Sizes (3)
│   │   └── States (loading, disabled)
│   │
│   ├── Card
│   │   ├── Variants (4)
│   │   └── States (hoverable, clickable)
│   │
│   └── Input
│       ├── Types (text, email, password)
│       ├── States (error, focus)
│       └── Icons (left, right)
│
└── Theme
    ├── Colors
    │   ├── Primary (Rose)
    │   ├── Secondary (Plum)
    │   ├── Accent (Gold)
    │   └── Neutrals
    │
    ├── Typography
    │   ├── Fonts (3)
    │   ├── Sizes (10)
    │   └── Weights (6)
    │
    ├── Spacing (13 values)
    ├── Border Radius (8 values)
    ├── Shadows (8 variants)
    ├── Gradients (6 presets)
    └── Breakpoints (6 sizes)
```

## Port Allocation

```
┌──────────┬─────────────────────────────┐
│  Port    │         Application         │
├──────────┼─────────────────────────────┤
│  3000    │  Client App (Customers)     │
│  3001    │  Provider Dashboard         │
│  3002    │  Admin Dashboard            │
│  4000    │  Backend API + Socket.io    │
└──────────┴─────────────────────────────┘
```

## Environment Configuration

```
Root Level
├── .gitignore                 Global ignore rules
├── package.json              Workspace config
└── tsconfig.json             Global TypeScript

App Level (Each Next.js App)
├── next.config.js            Next.js config
├── tsconfig.json             App TypeScript
└── .env.local (user creates) Environment vars

Backend
├── .env                      Actual environment
└── .env.example              Template
```

## Build Output Structure

```
After `npm run build`:

apps/client/.next/            Next.js build
apps/provider-dashboard/.next/ Next.js build
apps/admin-dashboard/.next/   Next.js build
backend/dist/                 Compiled JS

After `npm install`:

node_modules/                 At root level
apps/*/node_modules/          Symlinks to root
packages/*/node_modules/      Symlinks to root
```

## Development Workflow

```
1. Developer writes code
   ↓
2. TypeScript compiles
   ↓
3. Hot reload triggers
   ↓
4. Browser updates
   ↓
5. Changes reflected
```

## Production Deployment Structure

```
                ┌─────────────────┐
                │   Load Balancer │
                └────────┬────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Client App  │ │  Provider    │ │  Admin       │
│  (Vercel)    │ │  (Vercel)    │ │  (Vercel)    │
└──────────────┘ └──────────────┘ └──────────────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                ┌──────────────┐
                │  Backend API │
                │  (AWS/Heroku)│
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │  Database    │
                │ (PostgreSQL) │
                └──────────────┘
```

## File Size Overview

```
Total Project Size: ~15 MB

├── node_modules/        ~12 MB (dependencies)
├── apps/                ~1 MB  (source code)
├── packages/            ~500 KB (shared code)
├── backend/             ~500 KB (API code)
└── documentation/       ~500 KB (markdown files)
```

## Key Directories Explained

| Directory | Purpose | Editable |
|-----------|---------|----------|
| `/apps` | Main applications | ✅ Yes |
| `/packages` | Shared code | ✅ Yes |
| `/backend` | API server | ✅ Yes |
| `/node_modules` | Dependencies | ❌ No |
| `/.next` | Build output | ❌ No |
| `/dist` | Compiled backend | ❌ No |

## Navigation Quick Reference

**Want to edit...**

- Homepage → `apps/client/src/app/page.tsx`
- Services page → `apps/client/src/app/services/page.tsx`
- Provider dashboard → `apps/provider-dashboard/src/app/page.tsx`
- Admin panel → `apps/admin-dashboard/src/app/page.tsx`
- Button component → `packages/ui/src/components/Button.tsx`
- Design tokens → `packages/ui/src/theme/tokens.ts`
- Type definitions → `packages/types/src/index.ts`
- API routes → `backend/src/routes/*.ts`
- Mock data → `backend/src/data/mockData.ts`

---

**Project Version**: 1.0.0  
**Structure Type**: Monorepo (npm workspaces)  
**Total Applications**: 4  
**Total Packages**: 3  
**Total Documentation**: 6 files
