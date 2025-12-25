'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Card } from '@zoo/ui';
import { useRouter } from 'next/navigation';
import { 
  Search, UserCheck, Calendar, Sparkles, Star, Clock, Users, 
  Award, Shield, Heart, TrendingUp, ChevronDown, ChevronUp,
  X, Home, Menu, Phone, Mail, MapPin, Instagram, Facebook, Twitter,
  Scissors, Palette, Flower2, Sparkle, CheckCircle2, Moon, Sun
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [showPromo, setShowPromo] = useState(true);
  const [showNotification, setShowNotification] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(savedTheme === 'true');
    }
  }, []);

  // Save dark mode preference
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  const steps = [
    { icon: Search, title: 'Choose a Service', description: 'Browse our curated selection of premium beauty treatments' },
    { icon: UserCheck, title: 'Select a Beautician', description: 'Pick from verified professionals near you' },
    { icon: Calendar, title: 'Book Instantly', description: 'Schedule at your convenience in seconds' },
    { icon: Sparkles, title: 'Enjoy Your Service', description: 'Experience luxury beauty care wherever you are' },
  ];

  const featuredServices = [
    {
      id: '1',
      name: 'Luxury Hair Treatment',
      description: 'Deep conditioning with premium products',
      price: 150,
      duration: 90,
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80',
      gradient: 'linear-gradient(135deg, #FF6E8F 0%, #FF4275 100%)',
    },
    {
      id: '2',
      name: 'Classic Manicure & Pedicure',
      description: 'Complete nail care and polish',
      price: 75,
      duration: 60,
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80',
      gradient: 'linear-gradient(135deg, #9575BF 0%, #774EAF 100%)',
    },
    {
      id: '3',
      name: 'Bridal Makeup Package',
      description: 'Complete bridal look with trial',
      price: 250,
      duration: 120,
      rating: 5.0,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80',
      gradient: 'linear-gradient(135deg, #FFC470 0%, #FFB347 100%)',
    },
    {
      id: '4',
      name: 'Hydrating Facial',
      description: 'Deep cleansing and hydration',
      price: 120,
      duration: 75,
      rating: 4.7,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80',
      gradient: 'linear-gradient(135deg, #FF9BB0 0%, #FF6E8F 100%)',
    },
  ];

  const beauticians = [
    { id: '1', name: 'Emily Chen', specialty: 'Hair & Makeup', rating: 4.9, reviews: 234, location: 'Manhattan', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&q=80', verified: true },
    { id: '2', name: 'Sofia Rodriguez', specialty: 'Nail Art', rating: 5.0, reviews: 189, location: 'Brooklyn', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80', verified: true },
    { id: '3', name: 'Maya Patel', specialty: 'Skincare', rating: 4.8, reviews: 156, location: 'Queens', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', verified: true },
    { id: '4', name: 'Jessica Kim', specialty: 'Bridal Makeup', rating: 5.0, reviews: 298, location: 'Manhattan', image: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=300&q=80', verified: true },
    { id: '5', name: 'Nina Williams', specialty: 'Massage Therapy', rating: 4.9, reviews: 167, location: 'Bronx', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', verified: true },
  ];

  const benefits = [
    { icon: '✓', title: 'Verified Professionals', description: 'All beauticians are background-checked and certified' },
    { icon: '📅', title: 'Flexible Scheduling', description: 'Book anytime, anywhere, on your schedule' },
    { icon: '⭐', title: 'Premium Experience', description: 'Five-star service with luxury products' },
    { icon: '🔒', title: 'Secure Payments', description: 'Safe and encrypted payment processing' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', image: '👩', rating: 5, text: 'Absolutely amazing! The beautician was professional and the results were stunning. Best beauty service I have ever had!', service: 'Bridal Makeup' },
    { name: 'Emma Davis', image: '👱‍♀️', rating: 5, text: 'So convenient! Booked a last-minute appointment and they arrived on time with all the equipment. Highly recommend!', service: 'Manicure & Pedicure' },
    { name: 'Olivia Martinez', image: '👩‍🦱', rating: 5, text: 'The quality is exceptional. I love that I can get salon-quality services at home. Worth every penny!', service: 'Hair Treatment' },
  ];

  const faqs = [
    { q: 'How do I book a service?', a: 'Simply browse our services, select your preferred beautician, choose a time slot, and confirm your booking. Payment is processed securely through our platform.' },
    { q: 'Are all beauticians verified?', a: 'Yes! Every beautician undergoes thorough background checks, certification verification, and skills assessment before joining our platform.' },
    { q: 'What if I need to cancel or reschedule?', a: 'You can cancel or reschedule up to 24 hours before your appointment with no penalty. Cancellations within 24 hours may incur a fee.' },
    { q: 'Do beauticians bring their own equipment?', a: 'Yes, all our beauticians arrive fully equipped with professional-grade tools and premium products for your service.' },
    { q: 'What areas do you serve?', a: 'We currently operate in 25+ major cities across the US. Enter your location to see available beauticians in your area.' },
    { q: 'How do I become a beautician on the platform?', a: 'Visit our "Become a Beautician" page to apply. You\'ll need valid certifications, insurance, and to pass our vetting process.' },
  ];

  const liveBookings = [
    { name: 'Jessica', location: 'Manhattan', service: 'Hair Styling' },
    { name: 'Michael', location: 'Brooklyn', service: 'Massage' },
    { name: 'Amanda', location: 'Queens', service: 'Manicure' },
    { name: 'David', location: 'Bronx', service: 'Facial' },
  ];

  const [currentBooking, setCurrentBooking] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Live booking notifications
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBooking((prev) => (prev + 1) % liveBookings.length);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 8000);
    return () => clearInterval(timer);
  }, [liveBookings.length]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      position: 'relative', 
      overflow: 'hidden',
      background: darkMode ? '#0A0A0A' : '#FFFFFF',
      color: darkMode ? '#E5E5E5' : '#171717',
      transition: 'background 0.3s ease, color 0.3s ease',
    }}>
      {/* Promotional Banner */}
      {showPromo && (
        <div style={{
          background: darkMode 
            ? 'linear-gradient(135deg, #991E4D 0%, #4A2E6C 100%)'
            : 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
          color: 'white',
          padding: '0.75rem 2rem',
          textAlign: 'center',
          fontSize: '0.9375rem',
          fontWeight: 500,
          position: 'relative',
          zIndex: 1001,
        }}>
          <span>🎉 New Year Special: Get 25% off your first booking! Use code <strong>BEAUTY2025</strong></span>
          <button
            onClick={() => setShowPromo(false)}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Live Booking Notification */}
      {showNotification && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          left: '2rem',
          background: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          animation: 'slideInLeft 0.5s ease-out',
          maxWidth: '320px',
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            background: '#10B981',
            borderRadius: '50%',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <div style={{ fontSize: '0.9375rem' }}>
            <strong>{liveBookings[currentBooking].name}</strong> just booked{' '}
            <span style={{ color: '#FF4275' }}>{liveBookings[currentBooking].service}</span> in {liveBookings[currentBooking].location}
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: darkMode 
          ? (scrollY > 50 ? 'rgba(10, 10, 10, 0.85)' : 'rgba(10, 10, 10, 0.3)')
          : (scrollY > 50 ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.1)'),
        backdropFilter: scrollY > 50 ? 'blur(20px) saturate(180%)' : 'blur(10px)',
        WebkitBackdropFilter: scrollY > 50 ? 'blur(20px) saturate(180%)' : 'blur(10px)',
        boxShadow: scrollY > 50 ? (darkMode ? '0 4px 30px rgba(255, 255, 255, 0.05)' : '0 4px 30px rgba(0, 0, 0, 0.1)') : 'none',
        borderBottom: scrollY > 50 
          ? (darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.3)')
          : (darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(255, 255, 255, 0.1)'),
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '1rem 2rem',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ 
              position: 'relative',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid #E91E8C',
              boxShadow: '0 4px 15px rgba(233, 30, 140, 0.3)',
            }}>
              <Image
                src="/logo.png"
                alt="Zoo Beauty Palace"
                fill
                priority
                style={{ 
                  objectFit: 'cover',
                }}
              />
            </div>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              whiteSpace: 'nowrap',
            }}
            className="logo-text"
            >
              Zoo Beauty Palace
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={toggleDarkMode}
              style={{
                background: 'transparent',
                border: '2px solid',
                borderColor: darkMode ? '#FFD700' : '#FF4275',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: darkMode ? '0 0 20px rgba(255, 215, 0, 0.3)' : '0 0 20px rgba(255, 66, 117, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(180deg) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
              }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={20} style={{ color: '#FFD700' }} />
              ) : (
                <Moon size={20} style={{ color: '#FF4275' }} />
              )}
            </button>
            <Button variant="ghost" onClick={() => router.push('/login')}>Sign In</Button>
            <Button onClick={() => router.push('/register')}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '2rem',
        background: darkMode 
          ? 'linear-gradient(135deg, #0F0F0F 0%, #1A0A1A 50%, #0F0F0F 100%)'
          : 'linear-gradient(135deg, #FAF8FF 0%, #FFF5F8 50%, #FAF8FF 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated Background Orbs */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,66,117,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-20%',
          right: '-10%',
          animation: 'float 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(119,78,175,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-10%',
          left: '-5%',
          animation: 'float 15s ease-in-out infinite reverse',
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{
            maxWidth: '700px',
            animation: 'fadeInUp 1s ease-out',
          }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Premium Beauty Services, On-Demand
            </h1>
            <p style={{
              fontSize: '1.25rem',
              lineHeight: 1.7,
              color: '#525252',
              marginBottom: '2.5rem',
            }}>
              Experience luxury beauty treatments from certified professionals in the comfort of your home or favorite location. Book instantly, relax completely.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button
                size="lg"
                onClick={() => router.push('/services')}
                style={{
                  background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(255, 66, 117, 0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 66, 117, 0.4)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 66, 117, 0.3)';
                }}
              >
                Explore Services
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push('/beauticians')}
                style={{
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = '#FF4275';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = '#FF4275';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                Find Beauticians
              </Button>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '2rem',
              marginTop: '4rem',
            }}>
              {[
                { label: 'Verified Beauticians', value: '500+' },
                { label: 'Services Completed', value: '50K+' },
                { label: 'Customer Satisfaction', value: '98%' },
                { label: 'Cities Covered', value: '25+' },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#737373' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{
        padding: '6rem 2rem',
        background: darkMode ? '#0A0A0A' : 'white',
        opacity: visibleSections.has('how-it-works') ? 1 : 0,
        transform: visibleSections.has('how-it-works') ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontFamily: 'var(--font-heading)',
              marginBottom: '1rem',
              color: darkMode ? '#E5E5E5' : '#171717',
            }}>
              How It Works
            </h2>
            <p style={{ fontSize: '1.125rem', color: darkMode ? '#A3A3A3' : '#737373', maxWidth: '600px', margin: '0 auto' }}>
              Book premium beauty services in four simple steps
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
            {steps.map((step, index) => (
              <Card
                key={index}
                hoverable
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  position: 'relative',
                  border: darkMode ? '1px solid #262626' : '1px solid #E5E5E5',
                  background: darkMode ? '#171717' : 'white',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                }}>
                  {index + 1}
                </div>
                <div style={{ 
                  width: '80px',
                  height: '80px',
                  margin: '1rem auto 1.5rem',
                  background: darkMode 
                    ? 'linear-gradient(135deg, rgba(255, 66, 117, 0.2) 0%, rgba(119, 78, 175, 0.2) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 66, 117, 0.1) 0%, rgba(119, 78, 175, 0.1) 100%)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                }}>
                  <step.icon 
                    size={40} 
                    style={{ 
                      color: '#FF4275',
                      strokeWidth: 2,
                    }} 
                  />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  color: darkMode ? '#E5E5E5' : '#171717',
                }}>
                  {step.title}
                </h3>
                <p style={{ color: darkMode ? '#A3A3A3' : '#737373', lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section id="services" style={{
        padding: '6rem 2rem',
        background: darkMode 
          ? 'linear-gradient(180deg, #0F0F0F 0%, #0A0A0A 100%)'
          : 'linear-gradient(180deg, #FAF8FF 0%, white 100%)',
        opacity: visibleSections.has('services') ? 1 : 0,
        transform: visibleSections.has('services') ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontFamily: 'var(--font-heading)',
              marginBottom: '1rem',
              color: darkMode ? '#E5E5E5' : '#171717',
            }}>
              Featured Services
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#737373' }}>
              Popular treatments loved by our clients
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
          }}>
            {featuredServices.map((service, index) => (
              <div
                key={service.id}
                style={{
                  opacity: visibleSections.has('services') ? 1 : 0,
                  transform: visibleSections.has('services') ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  const card = e.currentTarget.firstChild as HTMLElement;
                  if (card) {
                    card.style.transform = 'translateY(-8px) scale(1.02)';
                    card.style.boxShadow = '0 20px 40px rgba(255, 66, 117, 0.2)';
                  }
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  const card = e.currentTarget.firstChild as HTMLElement;
                  if (card) {
                    card.style.transform = 'translateY(0) scale(1)';
                    card.style.boxShadow = 'none';
                  }
                }}
              >
                <Card
                  hoverable
                  style={{
                    overflow: 'hidden',
                    border: '1px solid #E5E5E5',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    height: '100%',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  <div
                    style={{
                      background: service.gradient,
                      height: '200px',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                      const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                      if (img) img.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                      const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                      if (img) img.style.transform = 'scale(1)';
                    }}
                  >
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#171717',
                    }}>
                      {service.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '8px',
                      color: 'white',
                    }}>
                      <Star size={14} fill="white" /> {service.rating}
                    </div>
                  </div>
                  <p style={{
                    color: '#737373',
                    fontSize: '0.9375rem',
                    marginBottom: '1rem',
                  }}>
                    {service.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #E5E5E5',
                  }}>
                    <div>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#FF4275',
                      }}>
                        ${service.price}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#A3A3A3' }}>
                        {service.duration} min
                      </div>
                    </div>
                    <Button onClick={() => router.push(`/services/${service.id}`)}>
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Beauticians */}
      <section id="beauticians" style={{
        padding: '6rem 2rem',
        background: 'white',
        opacity: visibleSections.has('beauticians') ? 1 : 0,
        transform: visibleSections.has('beauticians') ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontFamily: 'var(--font-heading)',
              marginBottom: '1rem',
              color: '#171717',
            }}>
              Top Beauticians
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#737373' }}>
              Meet our highly rated beauty professionals
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '2rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
          }}>
            {beauticians.map((beautician, index) => (
              <div
                key={beautician.id}
                style={{
                  minWidth: '280px',
                  opacity: visibleSections.has('beauticians') ? 1 : 0,
                  transform: visibleSections.has('beauticians') ? 'translateX(0)' : 'translateX(-50px)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  const card = e.currentTarget.firstChild as HTMLElement;
                  if (card) {
                    card.style.transform = 'translateY(-8px)';
                    card.style.boxShadow = '0 20px 40px rgba(119, 78, 175, 0.2)';
                  }
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  const card = e.currentTarget.firstChild as HTMLElement;
                  if (card) {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = 'none';
                  }
                }}
              >
                <Card
                  hoverable
                  style={{
                    border: '1px solid #E5E5E5',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    height: '100%',
                  }}
                >
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{
                    position: 'relative',
                    width: '120px',
                    height: '120px',
                    margin: '0 auto 1rem',
                    display: 'inline-block',
                  }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '3px solid #FF4275',
                      position: 'relative',
                    }}>
                      <Image
                        src={beautician.image}
                        alt={beautician.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    {beautician.verified && (
                      <div style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                        width: '2rem',
                        height: '2rem',
                        background: '#0EA5E9',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        border: '3px solid white',
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                        ✓
                      </div>
                    )}
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    color: '#171717',
                  }}>
                    {beautician.name}
                  </h3>
                  <div style={{
                    color: '#774EAF',
                    fontSize: '0.9375rem',
                    marginBottom: '0.75rem',
                    fontWeight: 500,
                  }}>
                    {beautician.specialty}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>⭐</span>
                    <span style={{ fontWeight: 600 }}>{beautician.rating}</span>
                    <span style={{ color: '#A3A3A3' }}>({beautician.reviews})</span>
                  </div>
                  <div style={{
                    color: '#737373',
                    fontSize: '0.875rem',
                    marginBottom: '1rem',
                  }}>
                    📍 {beautician.location}
                  </div>
                  <Button
                    onClick={() => router.push(`/beauticians/${beautician.id}`)}
                    style={{ width: '100%' }}
                  >
                    View Profile
                  </Button>
                </div>
              </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="benefits" style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #774EAF 0%, #FF4275 100%)',
        color: 'white',
        opacity: visibleSections.has('benefits') ? 1 : 0,
        transform: visibleSections.has('benefits') ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}>
            <div>
              <h3 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontFamily: 'var(--font-heading)',
                marginBottom: '1.5rem',
                lineHeight: 1.2,
              }}>
                Why Choose<br />Zoo Beauty Palace?
              </h3>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.7,
                opacity: 0.95,
              }}>
                We're committed to delivering exceptional beauty experiences with verified professionals, premium products, and unmatched convenience.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gap: '2rem',
            }}>
              {benefits.map((benefit, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: '1rem',
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                    }}>
                      {benefit.title}
                    </h4>
                    <p style={{
                      opacity: 0.9,
                      lineHeight: 1.6,
                    }}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{
        padding: '6rem 2rem',
        background: 'white',
        opacity: visibleSections.has('testimonials') ? 1 : 0,
        transform: visibleSections.has('testimonials') ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1rem',
            color: '#171717',
          }}>
            Client Stories
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#737373',
            marginBottom: '3rem',
          }}>
            Hear what our clients say about their experiences
          </p>

          <div style={{ position: 'relative', minHeight: '350px' }}>
            <Card style={{
              padding: '3rem',
              textAlign: 'center',
              minHeight: '350px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1.5rem',
              }}>
                {testimonials[currentTestimonial].image}
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem',
              }}>
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} style={{ fontSize: '1.5rem' }}>⭐</span>
                ))}
              </div>
              <p style={{
                fontSize: '1.25rem',
                lineHeight: 1.8,
                color: '#525252',
                marginBottom: '2rem',
                fontStyle: 'italic',
              }}>
                "{testimonials[currentTestimonial].text}"
              </p>
              <div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  marginBottom: '0.25rem',
                }}>
                  {testimonials[currentTestimonial].name}
                </div>
                <div style={{
                  color: '#774EAF',
                  fontSize: '0.9375rem',
                }}>
                  {testimonials[currentTestimonial].service}
                </div>
              </div>
            </Card>
          </div>

          {/* Testimonial Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '2rem',
          }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === currentTestimonial ? '#FF4275' : '#E5E5E5',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(180deg, white 0%, #FAF8FF 100%)',
        opacity: visibleSections.has('faq') ? 1 : 0,
        transform: visibleSections.has('faq') ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontFamily: 'var(--font-heading)',
              marginBottom: '1rem',
              color: '#171717',
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#737373' }}>
              Everything you need to know about our services
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  border: '1px solid #E5E5E5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: expandedFaq === index ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#171717',
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    fontSize: '1.5rem',
                    color: '#FF4275',
                    transform: expandedFaq === index ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease',
                  }}>
                    ▼
                  </span>
                </button>
                {expandedFaq === index && (
                  <div style={{
                    padding: '0 1.5rem 1.5rem',
                    color: '#525252',
                    lineHeight: 1.7,
                    animation: 'fadeIn 0.3s ease-out',
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Promotion */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #FAF8FF 0%, #FFF5F8 100%)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontFamily: 'var(--font-heading)',
                marginBottom: '1.5rem',
                lineHeight: 1.2,
              }}>
                Beauty Services<br />in Your Pocket
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: '#525252',
                marginBottom: '2rem',
              }}>
                Download the Zoo Beauty Palace app for seamless booking, exclusive deals, and instant access to hundreds of certified beauticians.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button
                  size="lg"
                  style={{
                    background: '#000',
                    border: 'none',
                  }}
                >
                  📱 App Store
                </Button>
                <Button
                  size="lg"
                  style={{
                    background: '#000',
                    border: 'none',
                  }}
                >
                  🤖 Google Play
                </Button>
              </div>
            </div>

            <div style={{
              fontSize: '15rem',
              textAlign: 'center',
              animation: 'float 4s ease-in-out infinite',
            }}>
              📱
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #1F1F1F 0%, #0A0A0A 100%)',
        color: 'white',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
          }}>
            Ready to Experience<br />Premium Beauty Care?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.7,
            opacity: 0.9,
            marginBottom: '2.5rem',
          }}>
            Join thousands of satisfied clients who trust Zoo Beauty Palace for their beauty needs.
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
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/services')}
              style={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              Browse Services
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: darkMode ? '#000000' : '#0A0A0A',
        color: 'white',
        padding: '4rem 2rem 2rem',
        borderTop: darkMode ? '1px solid #262626' : 'none',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}>
                <Image
                  src="/logo.png"
                  alt="Zoo Beauty Palace"
                  width={45}
                  height={45}
                  style={{ 
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #E91E8C',
                  }}
                />
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #FF4275 0%, #774EAF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Zoo Beauty Palace
                </div>
              </div>
              <p style={{ opacity: 0.8, lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Premium on-demand beauty services bringing luxury treatments to your doorstep.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    opacity: 0.8, 
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.background = 'rgba(255, 66, 117, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    opacity: 0.8, 
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.background = 'rgba(255, 66, 117, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    opacity: 0.8, 
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.background = 'rgba(255, 66, 117, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, opacity: 0.8 }}>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => router.push('/services')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Hair Styling</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => router.push('/services')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Makeup</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => router.push('/services')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Nail Care</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => router.push('/services')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Skincare</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => router.push('/services')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Massage</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, opacity: 0.8 }}>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => router.push('/about')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>About Us</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => router.push('/careers')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Careers</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => router.push('/become-beautician')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Become a Beautician</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => router.push('/become-beautician')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Partner With Us</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, opacity: 0.8 }}>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => alert('Help Center - Coming Soon')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Help Center</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => alert('Safety Information - Coming Soon')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Safety</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => alert('Terms of Service - Coming Soon')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Terms of Service</a></li>
                <li style={{ marginBottom: '0.75rem' }}><a onClick={() => alert('Privacy Policy - Coming Soon')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            opacity: 0.6,
          }}>
            © 2025 Zoo Beauty Palace. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: darkMode ? 'rgba(10, 10, 10, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: darkMode ? '0 -4px 30px rgba(255,255,255,0.05)' : '0 -4px 30px rgba(0,0,0,0.1)',
        padding: '0.75rem 1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.5rem',
        zIndex: 1000,
        borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
      }}>
        {[
          { icon: Home, label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
          { icon: Search, label: 'Services', action: () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) },
          { icon: Users, label: 'Beauticians', action: () => document.getElementById('beauticians')?.scrollIntoView({ behavior: 'smooth' }) },
          { icon: Calendar, label: 'Book', action: () => router.push('/services') },
        ].map((item) => {
          const IconComponent = item.icon;
          return (
          <button
            key={item.label}
            onClick={item.action}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              color: darkMode ? '#A3A3A3' : '#525252',
              transition: 'all 0.3s ease',
              borderRadius: '12px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = darkMode 
                ? 'linear-gradient(135deg, rgba(255, 66, 117, 0.2) 0%, rgba(119, 78, 175, 0.2) 100%)'
                : 'linear-gradient(135deg, rgba(255, 66, 117, 0.1) 0%, rgba(119, 78, 175, 0.1) 100%)';
              e.currentTarget.style.color = '#FF4275';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = darkMode ? '#A3A3A3' : '#525252';
            }}
          >
            <IconComponent size={24} strokeWidth={2} />
            <span>{item.label}</span>
          </button>
        );
        })}
      </nav>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateZ(0);
          }
          50% {
            transform: translateY(-20px) translateZ(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateZ(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1) translateZ(0);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05) translateZ(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Mobile bottom nav visibility */
        @media (min-width: 768px) {
          nav[style*="position: fixed"][style*="bottom: 0"] {
            display: none !important;
          }
        }

        /* Logo text visibility */
        .logo-text {
          display: none;
        }
        
        @media (min-width: 640px) {
          .logo-text {
            display: inline;
          }
        }

        /* Smooth scrolling for entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Performance optimizations */
        img, video {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
