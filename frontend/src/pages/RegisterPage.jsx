import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/FormInputs';
import { useToast } from '../context/ToastContext';
import Logo from '../components/Logo';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'client'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await register(formData);
      
      if (result.success) {
        toast.success('Account created successfully!');
        // Redirect based on user role
        switch(result.user.role) {
          case 'admin': navigate('/admin'); break;
          case 'provider': navigate('/provider'); break;
          case 'beautician': navigate('/beautician'); break;
          case 'client': navigate('/client'); break;
          default: navigate('/');
        }
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--background) 0%, var(--surface) 100%)',
      padding: 'var(--spacing-xl)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '550px',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: 'var(--spacing-3xl)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <Logo width="200px" style={{ marginBottom: '24px' }} />
          <h1 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '2.5rem',
            color: 'var(--primary-color)',
            marginBottom: 'var(--spacing-xs)'
          }}>Join Zoo Beauty</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            icon="✉️"
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            icon="📱"
          />
          
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            icon="🔒"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>I want to join as a:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                fontSize: '0.9375rem',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontFamily: 'var(--font-body)'
              }}
            >
              <option value="client">Client (I want to book services)</option>
              <option value="provider">Provider (I own a salon/business)</option>
              <option value="beautician">Beautician (I offer services)</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              marginTop: 'var(--spacing-md)',
              padding: 'var(--spacing-md)',
              background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'transform 0.2s',
              boxShadow: '0 4px 12px var(--shadow-light)'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center', fontSize: '0.9375rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
