# 🦓 Zoo Beauty Palace

A full-scale, production-ready beauty service platform with premium UI/UX.

## 🏗️ Architecture

This is a monorepo containing:

### Apps
- **Client App** (`apps/client`) - Next.js PWA for customers
- **Provider Dashboard** (`apps/provider-dashboard`) - Web dashboard for salon owners
- **Beautician Mobile** (`apps/beautician-mobile`) - React Native app for mobile beauticians
- **Admin Dashboard** (`apps/admin-dashboard`) - Platform administration panel

### Packages
- **Design System** (`packages/ui`) - Shared components and design tokens
- **Types** (`packages/types`) - Shared TypeScript types
- **Utils** (`packages/utils`) - Shared utilities

### Backend
- **API** (`backend`) - Node.js/Express API with real-time support

## 🎨 Design Language

**Premium Beauty-Tech Aesthetic**

### Colors
- Primary: Soft Rose / Blush Pink
- Secondary: Deep Plum / Royal Purple
- Accent: Gold / Champagne
- Neutrals: Ivory, Charcoal, Warm Gray

### Features
- Glassmorphism accents
- Smooth gradients
- Rounded cards
- Micro-interactions
- Light & Dark mode

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
# Install all dependencies
npm install

# Start all services in development mode
npm run dev

# Start individual services
npm run dev:client        # Client app on port 3000
npm run dev:provider      # Provider dashboard on port 3001
npm run dev:admin         # Admin dashboard on port 3002
npm run dev:beautician    # Beautician mobile app
npm run dev:backend       # Backend API on port 4000
```

## 📱 Applications

### Client App (http://localhost:3000)
- Browse services and beauticians
- Service booking flow
- Booking history
- Live tracking
- Reviews & ratings

### Provider Dashboard (http://localhost:3001)
- Service management
- Booking management
- Staff management
- Analytics
- Customer management

### Beautician Mobile App
- Job requests feed
- Accept/decline jobs
- Navigation & tracking
- Availability toggle
- Earnings overview

### Admin Dashboard (http://localhost:3002)
- User management
- Service categories
- Pricing & commissions
- Analytics & reports
- Platform moderation

## ⚠️ Development Notes

**NO AUTHENTICATION INITIALLY**
- All features are built without login/signup
- Mock users and open access for development
- Authentication will be added after full system approval

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Mobile**: React Native, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **State**: React Context, Zustand
- **Real-time**: Socket.io
- **Database**: PostgreSQL (or MongoDB)

## 📦 Build

```bash
npm run build
```

## 📄 License

Proprietary - Zoo Beauty Palace
