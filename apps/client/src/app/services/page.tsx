'use client';

import { useState, useEffect } from 'react';
import { Button, Card, Input } from '@zoo/ui';
import { useRouter } from 'next/navigation';
import type { Service, ServiceCategory } from '@zoo/types';
import { api } from '@/lib/api';

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, selectedCategory, searchQuery, priceRange]);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getServices();
      setServices(response.data || []);
      setFilteredServices(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load services');
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = [...services];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by price range
    filtered = filtered.filter(s => s.price >= priceRange[0] && s.price <= priceRange[1]);

    setFilteredServices(filtered);
  };

  const categories: { value: string; label: string; icon: string }[] = [
    { value: 'all', label: 'All', icon: '🎯' },
    { value: 'hair', label: 'Hair', icon: '💇‍♀️' },
    { value: 'nails', label: 'Nails', icon: '💅' },
    { value: 'makeup', label: 'Makeup', icon: '💄' },
    { value: 'skincare', label: 'Skincare', icon: '✨' },
    { value: 'massage', label: 'Massage', icon: '💆‍♀️' },
    { value: 'spa', label: 'Spa', icon: '🧖‍♀️' },
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <Button onClick={fetchServices}>Retry</Button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
        padding: '1.5rem 2rem',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1
            style={{
              fontSize: '2rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
            onClick={() => router.push('/')}
          >
            🦓 Zoo Beauty Palace
          </h1>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Button variant="ghost" style={{ color: 'white' }} onClick={() => router.push('/beauticians')}>
              Beauticians
            </Button>
            <Button variant="ghost" style={{ color: 'white' }} onClick={() => router.push('/bookings')}>
              My Bookings
            </Button>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontFamily: 'var(--font-heading)',
            marginBottom: '0.5rem',
          }}>
            Browse Services
          </h2>
          <p style={{ color: '#737373', fontSize: '1.125rem' }}>
            Discover and book premium beauty services
          </p>
        </div>

        {/* Search and Filters */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}>
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<span>🔍</span>}
            fullWidth
            style={{ marginBottom: '1.5rem' }}
          />

          {/* Category Filters */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
          }}>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem',
                  border: 'none',
                  background: selectedCategory === cat.value
                    ? 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)'
                    : 'white',
                  color: selectedCategory === cat.value ? 'white' : '#525252',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedCategory === cat.value
                    ? '0 4px 6px rgba(255, 66, 117, 0.3)'
                    : '0 2px 4px rgba(0,0,0,0.1)',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div style={{ marginTop: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 600,
              color: '#525252',
            }}>
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              style={{
                width: '100%',
                accentColor: '#FF4275',
              }}
            />
          </div>
        </div>

        {/* Results */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: '#737373' }}>
            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              variant="elevated"
              hoverable
              onClick={() => router.push(`/services/${service.id}`)}
            >
              <div style={{
                fontSize: '4rem',
                textAlign: 'center',
                marginBottom: '1rem',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #FFF5F7 0%, #F5F3F7 100%)',
                borderRadius: '1rem',
              }}>
                {service.category === 'hair' ? '💇‍♀️' :
                 service.category === 'nails' ? '💅' :
                 service.category === 'makeup' ? '💄' :
                 service.category === 'skincare' ? '✨' :
                 service.category === 'massage' ? '💆‍♀️' :
                 service.category === 'spa' ? '🧖‍♀️' : '💎'}
              </div>
              
              <div style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                background: '#FFF5F7',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#FF4275',
                marginBottom: '0.75rem',
                textTransform: 'capitalize',
              }}>
                {service.category}
              </div>

              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}>
                {service.name}
              </h3>

              <p style={{
                color: '#737373',
                fontSize: '0.875rem',
                marginBottom: '1rem',
                lineHeight: 1.5,
              }}>
                {service.description || 'Premium beauty service'}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid #E5E5E5',
              }}>
                <div>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#FF4275',
                  }}>
                    ${service.price}
                  </span>
                  <span style={{
                    color: '#A3A3A3',
                    fontSize: '0.875rem',
                    marginLeft: '0.5rem',
                  }}>
                    {service.duration}min
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}>
                  <span>⭐</span>
                  <span style={{ fontWeight: 600 }}>{service.rating || 5.0}</span>
                  <span style={{ color: '#A3A3A3', fontSize: '0.875rem' }}>
                    ({service.review_count || 0})
                  </span>
                </div>
              </div>

              <Button
                fullWidth
                style={{ marginTop: '1rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/booking?service=${service.id}`);
                }}
              >
                Book Now
              </Button>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '1.5rem',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{
              fontSize: '1.5rem',
              fontFamily: 'var(--font-heading)',
              marginBottom: '0.5rem',
            }}>
              No services found
            </h3>
            <p style={{ color: '#737373' }}>
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
