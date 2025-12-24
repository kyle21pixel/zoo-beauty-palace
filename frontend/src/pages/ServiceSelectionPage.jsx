import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard.jsx';
import { serviceAPI } from '../services/api';
import { handleApiCall } from '../utils/apiUtils';

const ServiceSelectionPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const result = await handleApiCall(
        () => serviceAPI.getAll(),
        setLoading,
        setError
      );
      setServices(result.data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleServiceSelect = (service) => {
    navigate(`/book?serviceId=${service.id}&serviceName=${encodeURIComponent(service.name)}`);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading services...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: '#DC3545',
        fontSize: '18px'
      }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#5A2D82', marginBottom: '30px' }}>Select a Service</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {services.map(service => (
          <ServiceCard 
            key={service.id} 
            service={service}
            onClick={handleServiceSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceSelectionPage;