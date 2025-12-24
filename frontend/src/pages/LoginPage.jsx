import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
      const result = await login(formData.email, formData.password);
      
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
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div className="login-container" style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#5A2D82' }}>Login to Zoo Beauty Palace</h2>
        {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
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
          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Password</label>
            <input 
              type="password" 
              name="password"
              className="form-input" 
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '16px', marginBottom: '20px' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="login-options" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '10px' }}>Don't have an account? <Link to="/register" style={{ color: '#5A2D82', fontWeight: 'bold' }}>Register</Link></p>
          <p><a href="/forgot-password" style={{ color: '#5A2D82' }}>Forgot Password?</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;