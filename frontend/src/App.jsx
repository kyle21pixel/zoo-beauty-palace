import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';

// Import components
import Navbar from './components/Navbar';

// Import pages
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import BeauticianDashboard from './pages/beautician/BeauticianDashboard';
import ClientDashboard from './pages/client/ClientDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServiceSelectionPage from './pages/ServiceSelectionPage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/services" element={<ServiceSelectionPage />} />
            <Route path="/book" element={<BookingPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Provider Routes */}
            <Route path="/provider/*" element={
              <ProtectedRoute allowedRoles={['provider']}>
                <ProviderDashboard />
              </ProtectedRoute>
            } />
            
            {/* Beautician Routes */}
            <Route path="/beautician/*" element={
              <ProtectedRoute allowedRoles={['beautician']}>
                <BeauticianDashboard />
              </ProtectedRoute>
            } />
            
            {/* Client Routes */}
            <Route path="/client/*" element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;