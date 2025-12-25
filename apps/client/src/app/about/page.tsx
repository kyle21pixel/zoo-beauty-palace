'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@zoo/ui';
import { useRouter } from 'next/navigation';
import { Target, Sparkles, Star, Heart, Shield, TrendingUp, ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

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
            About Zoo Beauty Palace
          </h1>
          <p style={{
            fontSize: '1.25rem',
            lineHeight: 1.7,
            opacity: 0.95,
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            Redefining beauty care with luxury, convenience, and expertise delivered right to your doorstep.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ padding: '6rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontFamily: 'var(--font-heading)',
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Our Story
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: '#525252',
                marginBottom: '1.5rem',
              }}>
                Founded in 2020, Zoo Beauty Palace emerged from a simple vision: to bring premium beauty services to the comfort of your home. We recognized that modern life demands convenience without compromising on quality.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: '#525252',
              }}>
                Today, we've grown into a trusted platform connecting thousands of clients with certified beauty professionals, delivering over 50,000 appointments and counting.
              </p>
            </div>
            <div style={{ position: 'relative', height: '400px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
                alt="Beauty salon"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '6rem 2rem', background: '#FAFAFA' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div style={{
              padding: '3rem',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
            }}
            >
              <div style={{ 
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(255, 66, 117, 0.1) 0%, rgba(119, 78, 175, 0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
              }}>
                <Target size={40} style={{ color: '#FF4275' }} />
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Our Mission
              </h3>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#525252' }}>
                To revolutionize the beauty industry by making professional beauty services accessible, convenient, and personalized for everyone, everywhere.
              </p>
            </div>

            <div style={{
              padding: '3rem',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
            }}
            >
              <div style={{ 
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(255, 66, 117, 0.1) 0%, rgba(119, 78, 175, 0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
              }}>
                <Sparkles size={40} style={{ color: '#774EAF' }} />
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Our Vision
              </h3>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#525252' }}>
                To become the world's most trusted platform for on-demand beauty services, empowering both clients and beauty professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
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
            Our Core Values
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: Star, title: 'Excellence', description: 'We never compromise on quality and professionalism', color: '#FF4275' },
              { icon: Heart, title: 'Care', description: 'Every client receives personalized attention', color: '#FF6E8F' },
              { icon: Shield, title: 'Safety', description: 'Rigorous verification and hygiene standards', color: '#774EAF' },
              { icon: TrendingUp, title: 'Innovation', description: 'Continuously improving the beauty service experience', color: '#9575BF' },
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
              <div key={index} style={{
                padding: '2rem',
                textAlign: 'center',
                background: '#FAFAFA',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ 
                  width: '70px',
                  height: '70px',
                  borderRadius: '15px',
                  background: `linear-gradient(135deg, ${value.color}15 0%, ${value.color}30 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                  <IconComponent size={35} style={{ color: value.color }} />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{value.title}</h4>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#525252' }}>{value.description}</p>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '6rem 2rem', background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}>
            {[
              { number: '50K+', label: 'Happy Clients' },
              { number: '500+', label: 'Expert Beauticians' },
              { number: '20+', label: 'Cities Covered' },
              { number: '4.9★', label: 'Average Rating' },
            ].map((stat, index) => (
              <div key={index}>
                <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '1.125rem', opacity: 0.9 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 2rem', background: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
          }}>
            Ready to Join Our Beauty Revolution?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.7,
            color: '#525252',
            marginBottom: '2.5rem',
          }}>
            Experience the difference of premium beauty care at your doorstep.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              size="lg"
              onClick={() => router.push('/register')}
              style={{
                background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                border: 'none',
                boxShadow: '0 10px 30px rgba(255, 66, 117, 0.4)',
              }}
            >
              Get Started Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/careers')}
            >
              Join Our Team
            </Button>
          </div>
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
