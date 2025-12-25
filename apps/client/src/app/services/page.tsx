'use client';

import { useState } from 'react';
import { Button, Card, Input } from '@zoo/ui';
import { useRouter } from 'next/navigation';
import type { Service, ServiceCategory } from '@zoo/types';

// Mock data
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Luxury Hair Treatment',
    description: 'Deep conditioning treatment with premium products for silky smooth hair',
    category: 'hair',
    price: 150,
    duration: 90,
    providerId: 'p1',
    images: ['🎨'],
    tags: ['luxury', 'conditioning', 'treatment'],
    available: true,
    rating: 4.8,
    reviewCount: 156,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Classic Manicure & Pedicure',
    description: 'Complete nail care with polish, shaping, and cuticle treatment',
    category: 'nails',
    price: 75,
    duration: 60,
    providerId: 'p2',
    images: ['💅'],
    tags: ['manicure', 'pedicure', 'classic'],
    available: true,
    rating: 4.9,
    reviewCount: 203,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Bridal Makeup Package',
    description: 'Complete bridal makeup with trial session and hair styling',
    category: 'makeup',
    price: 250,
    duration: 120,
    providerId: 'p3',
    images: ['💄'],
    tags: ['bridal', 'makeup', 'special'],
    available: true,
    rating: 5.0,
    reviewCount: 89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Hydrating Facial',
    description: 'Deep cleansing and hydrating facial for glowing skin',
    category: 'skincare',
    price: 120,
    duration: 75,
    providerId: 'p1',
    images: ['✨'],
    tags: ['facial', 'hydrating', 'skincare'],
    available: true,
    rating: 4.7,
    reviewCount: 145,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Swedish Massage',
    description: 'Relaxing full-body massage to relieve stress and tension',
    category: 'massage',
    price: 100,
    duration: 60,
    providerId: 'p4',
    images: ['💆‍♀️'],
    tags: ['massage', 'relaxation', 'wellness'],
    available: true,
    rating: 4.9,
    reviewCount: 178,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Spa Day Package',
    description: 'Full day spa experience with multiple treatments',
    category: 'spa',
    price: 350,
    duration: 240,
    providerId: 'p5',
    images: ['🧖‍♀️'],
    tags: ['spa', 'package', 'luxury'],
    available: true,
    rating: 5.0,
    reviewCount: 92,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ServicesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const categories: { value: ServiceCategory | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: 'All', icon: '🎯' },
    { value: 'hair', label: 'Hair', icon: '💇‍♀️' },
    { value: 'nails', label: 'Nails', icon: '💅' },
    { value: 'makeup', label: 'Makeup', icon: '💄' },
    { value: 'skincare', label: 'Skincare', icon: '✨' },
    { value: 'massage', label: 'Massage', icon: '💆‍♀️' },
    { value: 'spa', label: 'Spa', icon: '🧖‍♀️' },
  ];

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

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
                {service.images[0]}
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
                {service.description}
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
                  <span style={{ fontWeight: 600 }}>{service.rating}</span>
                  <span style={{ color: '#A3A3A3', fontSize: '0.875rem' }}>
                    ({service.reviewCount})
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
