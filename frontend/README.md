# Zoo Beauty Palace Frontend

This is the frontend implementation for the Zoo Beauty Palace application, a beauty services platform connecting clients with beauty service providers and freelance beauticians.

## Features

- **User Authentication**: Login and registration system with role-based access
- **Service Booking**: Clients can book beauty services (Wig Installation, Braiding, Barbering, Nails, Massage, Tattooing)
- **Dashboard System**: Role-based dashboards for Admins, Beauty Providers, Freelance Beauticians, and Clients
- **Booking Management**: Real-time booking status updates and management
- **Responsive Design**: Works on all device sizes

## Tech Stack

- React.js
- React Router for navigation
- Axios for API requests
- Context API for state management
- CSS for styling

## Architecture

### Components
- `AuthContext`: Manages user authentication state
- `ProtectedRoute`: Handles role-based route protection
- `ServiceCard`: Displays service information
- `BookingCard`: Displays booking details with status management

### Pages
- `HomePage`: Landing page with service overview
- `ServiceSelectionPage`: Allows clients to select services
- `BookingPage`: Handles service booking process
- `LoginPage`: User authentication
- `RegisterPage`: User registration
- Dashboard pages for each role (Admin, Provider, Beautician, Client)

### API Services
- `api.js`: Handles all API requests with mock data fallback
- `mockData.js`: Provides mock data for frontend development

## Setup

1. Install dependencies: `npm install`
2. Create a `.env` file in the frontend directory with:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_USE_MOCK_API=true
   ```
3. Start the development server: `npm start`

## API Integration

The frontend is designed to work with the backend API at `/api` endpoint. Currently using mock data for development, but can be easily switched to real API by setting `REACT_APP_USE_MOCK_API=false` in the environment variables.

## Role-Based Access

- **Admin**: Full system control, user management, analytics
- **Provider**: Business services, on-route bookings
- **Beautician**: Freelance services, on-site bookings
- **Client**: Service booking, profile management

## Next Steps

- Implement real backend API integration
- Add payment processing
- Add real-time notifications
- Implement chat functionality
- Add more comprehensive user profiles