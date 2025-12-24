import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await register(formData);
      
      if (result.success) {
        // Redirect based on user role
        switch(result.user.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'provider':
            navigate('/provider');
            break;
          case 'beautician':
            navigate('/beautician');
            break;
          case 'client':
            navigate('/client');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div className="register-container" style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#5A2D82' }}>Join Zoo Beauty Palace</h2>
        {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>First Name</label>
              <input 
                type="text" 
                name="firstName"
                className="form-input" 
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Last Name</label>
              <input 
                type="text" 
                name="lastName"
                className="form-input" 
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Email</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Phone</label>
            <input 
              type="tel" 
              name="phone"
              className="form-input" 
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
              disabled={loading}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Password</label>
            <input 
              type="password" 
              name="password"
              className="form-input" 
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Role</label>
            <select 
              name="role"
              className="form-input" 
              value={formData.role}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
              required
              disabled={loading}
            >
              <option value="">Select your role</option>
              <option value="client">Client</option>
              <option value="provider">Beauty Provider</option>
              <option value="beautician">Freelance Beautician</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '16px', marginBottom: '20px' }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="register-options" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '10px' }}>Already have an account? <Link to="/login" style={{ color: '#5A2D82', fontWeight: 'bold' }}>Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;