import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard.jsx';
import { serviceAPI } from '../services/api';
import { handleApiCall } from '../utils/apiUtils';
import { SkeletonList } from '../components/Skeleton';
import { EmptyState, ErrorState } from '../components/EmptyState';

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

  if (error) {
    return (
      <div style={{ padding: 'var(--spacing-3xl)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ErrorState 
          title="Unable to Load Services" 
          description={error} 
          onRetry={fetchServices} 
        />
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--background)',
      padding: 'var(--spacing-3xl) var(--spacing-xl)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '3rem',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-md)',
            fontWeight: '700'
          }}>
            Select Your <span style={{ 
              background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Experience</span>
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.125rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Choose from our curated list of premium beauty services
          </p>
        </div>

        {loading ? (
          <SkeletonList count={6} />
        ) : services.length === 0 ? (
          <EmptyState
            icon="✨"
            title="No Services Available"
            description="We are currently updating our service menu. Please check back soon."
          />
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: 'var(--spacing-xl)' 
          }}>
            {services.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service}
                onClick={handleServiceSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSelectionPage;
