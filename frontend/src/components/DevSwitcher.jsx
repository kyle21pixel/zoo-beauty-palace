import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DevSwitcher = () => {
  const navigate = useNavigate();
  const { devSignIn } = useAuth();

  const roles = [
    { key: 'admin', label: 'Admin', path: '/admin' },
    { key: 'provider', label: 'Provider', path: '/provider' },
    { key: 'beautician', label: 'Beautician', path: '/beautician' },
    { key: 'client', label: 'Client', path: '/client' },
  ];

  const handleChange = (e) => {
    const roleKey = e.target.value;
    if (!roleKey) return;
    const role = roles.find(r => r.key === roleKey);
    if (!role) return;

    // set mock auth in context/localStorage and navigate
    if (typeof devSignIn === 'function') {
      devSignIn(roleKey);
    }
    navigate(role.path);
  };

  if (import.meta.env.VITE_ENABLE_DEV_SWITCHER !== 'true') return null;

  return (
    <select onChange={handleChange} defaultValue="" style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.1)' }}>
      <option value="">Dev: Switch Role</option>
      {roles.map(r => (
        <option key={r.key} value={r.key}>{r.label}</option>
      ))}
    </select>
  );
};

export default DevSwitcher;
