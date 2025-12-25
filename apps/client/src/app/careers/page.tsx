'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Card } from '@zoo/ui';
import { useRouter } from 'next/navigation';

export default function CareersPage() {
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const openPositions = [
    {
      id: 1,
      title: 'Senior Beauty Consultant',
      department: 'Operations',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Join our team to help beauticians grow their business and deliver exceptional service.',
    },
    {
      id: 2,
      title: 'Mobile App Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build cutting-edge features for our mobile platform used by thousands daily.',
    },
    {
      id: 3,
      title: 'Customer Success Manager',
      department: 'Support',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      description: 'Ensure our clients have the best experience with every booking.',
    },
    {
      id: 4,
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Chicago, IL',
      type: 'Full-time',
      description: 'Create compelling campaigns to grow our brand awareness.',
    },
    {
      id: 5,
      title: 'Data Analyst',
      department: 'Data',
      location: 'Remote',
      type: 'Full-time',
      description: 'Turn data into insights that drive business decisions.',
    },
    {
      id: 6,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Design beautiful and intuitive experiences for our users.',
    },
  ];

  const benefits = [
    { icon: '💰', title: 'Competitive Salary', description: 'Industry-leading compensation packages' },
    { icon: '🏥', title: 'Health Benefits', description: 'Comprehensive medical, dental, and vision coverage' },
    { icon: '🏖️', title: 'Unlimited PTO', description: 'Take the time you need to recharge' },
    { icon: '📚', title: 'Learning Budget', description: 'Annual budget for courses and conferences' },
    { icon: '🏡', title: 'Remote Work', description: 'Flexible work from home options' },
    { icon: '🎉', title: 'Team Events', description: 'Regular team building activities' },
  ];

  const departments = ['all', 'Engineering', 'Operations', 'Marketing', 'Design', 'Support', 'Data'];

  const filteredPositions = selectedDepartment === 'all'
    ? openPositions
    : openPositions.filter(p => p.department === selectedDepartment);

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        background: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        padding: '1rem 2rem',
        zIndex: 100,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => router.push('/')}>
            <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #E91E8C', overflow: 'hidden' }}>
              <Image src="/logo.png" alt="Zoo Beauty Palace" fill style={{ objectFit: 'cover' }} />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Zoo Beauty Palace
            </span>
          </div>
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
        color: 'white',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
          }}>
            Join Our Team
          </h1>
          <p style={{
            fontSize: '1.25rem',
            lineHeight: 1.7,
            opacity: 0.95,
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            Help us revolutionize the beauty industry. Build your career while making beauty accessible to everyone.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section style={{ padding: '6rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.5rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Why Work With Us?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: '#525252',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto 4rem',
          }}>
            We're building something special, and we want passionate people to join us on this journey.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {benefits.map((benefit, index) => (
              <Card key={index} style={{
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid #E5E5E5',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{benefit.icon}</div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{benefit.title}</h4>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#525252' }}>{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section style={{ padding: '6rem 2rem', background: '#FAFAFA' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: 'var(--font-heading)',
            marginBottom: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Open Positions
          </h2>

          {/* Department Filter */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  border: selectedDepartment === dept ? 'none' : '2px solid #E5E5E5',
                  background: selectedDepartment === dept ? 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)' : 'white',
                  color: selectedDepartment === dept ? 'white' : '#525252',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {dept === 'all' ? 'All Departments' : dept}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {filteredPositions.map((position) => (
              <Card key={position.id} style={{
                padding: '2rem',
                border: '1px solid #E5E5E5',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      marginBottom: '0.75rem',
                      background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {position.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap', fontSize: '0.95rem', color: '#737373' }}>
                      <span>📍 {position.location}</span>
                      <span>💼 {position.type}</span>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '50px',
                        background: '#F3F4F6',
                        color: '#525252',
                        fontWeight: 600,
                      }}>
                        {position.department}
                      </span>
                    </div>
                    <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#525252' }}>
                      {position.description}
                    </p>
                  </div>
                  <Button
                    onClick={() => alert(`Apply for: ${position.title}`)}
                    style={{
                      background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                      border: 'none',
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredPositions.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#737373' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <p style={{ fontSize: '1.125rem' }}>No positions found in this department.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)', color: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
          }}>
            Don't See the Right Role?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.7,
            opacity: 0.95,
            marginBottom: '2.5rem',
          }}>
            We're always looking for talented people. Send us your resume and tell us how you can contribute.
          </p>
          <Button
            size="lg"
            onClick={() => alert('Email: careers@zoobeauty.com')}
            style={{
              background: 'white',
              color: '#FF4275',
              border: 'none',
            }}
          >
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#0A0A0A',
        color: 'white',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <p style={{ opacity: 0.6 }}>© 2025 Zoo Beauty Palace. All rights reserved.</p>
      </footer>
    </div>
  );
}
