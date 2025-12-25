'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Card } from '@zoo/ui';
import { useRouter } from 'next/navigation';

export default function BecomeBeauticianPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    experience: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Application submitted! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', specialty: '', experience: '' });
  };

  const benefits = [
    { icon: '💰', title: 'Flexible Earnings', description: 'Set your own rates and work schedule' },
    { icon: '📱', title: 'Easy Booking', description: 'Get clients through our platform' },
    { icon: '🎓', title: 'Training Support', description: 'Access to workshops and certifications' },
    { icon: '🌟', title: 'Build Your Brand', description: 'Showcase your portfolio and reviews' },
    { icon: '🔒', title: 'Insurance Coverage', description: 'Protected on every appointment' },
    { icon: '📈', title: 'Grow Your Business', description: 'Marketing and client management tools' },
  ];

  const steps = [
    { number: '1', title: 'Apply Online', description: 'Fill out our simple application form' },
    { number: '2', title: 'Verification', description: 'Submit your certifications and portfolio' },
    { number: '3', title: 'Training', description: 'Complete our platform orientation' },
    { number: '4', title: 'Start Earning', description: 'Accept bookings and build your clientele' },
  ];

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
            Become a Beautician Partner
          </h1>
          <p style={{
            fontSize: '1.25rem',
            lineHeight: 1.7,
            opacity: 0.95,
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            Join thousands of beauty professionals earning on their own terms. Grow your business with Zoo Beauty Palace.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '6rem 2rem', background: 'white' }}>
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
            Why Partner With Us?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {benefits.map((benefit, index) => (
              <Card key={index} style={{
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid #E5E5E5',
                transition: 'transform 0.3s ease',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{benefit.icon}</div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{benefit.title}</h4>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#525252' }}>{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
            How It Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            {steps.map((step, index) => (
              <div key={index} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'white',
                  margin: '0 auto 1.5rem',
                }}>
                  {step.number}
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{step.title}</h4>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#525252' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section style={{ padding: '6rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.5rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Apply Now
          </h2>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.7,
            color: '#525252',
            textAlign: 'center',
            marginBottom: '3rem',
          }}>
            Fill out the form below and we'll get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit} style={{
            background: '#FAFAFA',
            padding: '3rem',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#525252' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '2px solid #E5E5E5',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#525252' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '2px solid #E5E5E5',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#525252' }}>
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '2px solid #E5E5E5',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#525252' }}>
                Specialty *
              </label>
              <select
                required
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '2px solid #E5E5E5',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              >
                <option value="">Select your specialty</option>
                <option value="hair">Hair Styling</option>
                <option value="makeup">Makeup Artist</option>
                <option value="nails">Nail Technician</option>
                <option value="skincare">Skincare Specialist</option>
                <option value="massage">Massage Therapist</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#525252' }}>
                Years of Experience *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '2px solid #E5E5E5',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                border: 'none',
                boxShadow: '0 10px 30px rgba(255, 66, 117, 0.4)',
              }}
            >
              Submit Application
            </Button>
          </form>
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
