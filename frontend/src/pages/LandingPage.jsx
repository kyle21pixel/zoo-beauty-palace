import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/Badge';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { name: 'Wig Installation', icon: '👸', color: '#5A2D82', gradient: 'linear-gradient(135deg, #5A2D82 0%, #7C3AED 100%)' },
    { name: 'Braiding', icon: '💁', color: '#F1C0E8', gradient: 'linear-gradient(135deg, #F1C0E8 0%, #F9A8D4 100%)' },
    { name: 'Barbering', icon: '✂️', color: '#FF9F1C', gradient: 'linear-gradient(135deg, #FF9F1C 0%, #FBBF24 100%)' },
    { name: 'Nails', icon: '💅', color: '#EC4899', gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)' },
    { name: 'Massage', icon: '💆', color: '#8B5CF6', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)' },
    { name: 'Tattooing', icon: '🎨', color: '#F59E0B', gradient: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)' }
  ];

  const steps = [
    { number: '01', title: 'Choose a Service', description: 'Browse our curated selection of premium beauty services', icon: '✨' },
    { number: '02', title: 'Select Location', description: 'Pick On-Route (salon) or On-Site (at your location)', icon: '📍' },
    { number: '03', title: 'Pick Your Provider', description: 'Choose from verified professionals with real reviews', icon: '👤' },
    { number: '04', title: 'Relax & Enjoy', description: 'Sit back while beauty comes to you', icon: '💆‍♀️' }
  ];

  const benefits = [
    { icon: '✓', title: 'Verified Professionals', description: 'Every provider is background-checked and certified' },
    { icon: '📅', title: 'Flexible Booking', description: 'Book instantly or schedule weeks in advance' },
    { icon: '📍', title: 'Real-Time Tracking', description: 'Know exactly when your beautician will arrive' },
    { icon: '🔒', title: 'Secure Payments', description: 'Pay safely with encrypted transactions' },
    { icon: '⭐', title: 'Premium Experience', description: 'Luxury service without leaving your comfort zone' },
    { icon: '💬', title: '24/7 Support', description: 'Customer care available whenever you need us' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Regular Client', photo: 'SJ', rating: 5, quote: 'The convenience is unmatched. Professional beauticians arrive on time, every time. Absolutely love it!' },
    { name: 'Michael Chen', role: 'Business Professional', photo: 'MC', rating: 5, quote: 'As someone with a busy schedule, Zoo Beauty Palace has been a game-changer. Quality service at my doorstep.' },
    { name: 'Priya Patel', role: 'Salon Owner', photo: 'PP', rating: 5, quote: 'Partnering with Zoo Beauty has increased my bookings by 40%. The platform is seamless and professional.' }
  ];

  return (
    <div style={{ 
      background: 'var(--background)',
      color: 'var(--text-primary)',
      overflow: 'hidden'
    }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #5A2D82 0%, #7C3AED 50%, #F1C0E8 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(241, 192, 232, 0.2)',
          filter: 'blur(100px)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 159, 28, 0.2)',
          filter: 'blur(80px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 var(--spacing-3xl)',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--spacing-3xl)',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div style={{
              animation: 'fadeInUp 1s ease-out',
              color: 'white'
            }}>
              <Badge 
                variant="default" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  marginBottom: 'var(--spacing-lg)'
                }}
              >
                ✨ Premium Beauty Services
              </Badge>
              
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                fontWeight: '700',
                lineHeight: '1.1',
                marginBottom: 'var(--spacing-xl)',
                letterSpacing: '-0.02em'
              }}>
                Luxury Beauty Services,<br />
                <span style={{ 
                  background: 'linear-gradient(90deg, #FBBF24, #FF9F1C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Wherever You Are
                </span>
              </h1>

              <p style={{
                fontSize: '1.25rem',
                lineHeight: '1.8',
                marginBottom: 'var(--spacing-3xl)',
                opacity: 0.95,
                maxWidth: '600px'
              }}>
                Experience premium beauty services at your doorstep or visit our partner salons. 
                Verified professionals, flexible booking, luxury experience.
              </p>

              <div style={{
                display: 'flex',
                gap: 'var(--spacing-md)',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => navigate('/services')}
                  style={{
                    padding: 'var(--spacing-lg) var(--spacing-3xl)',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    background: 'white',
                    color: '#5A2D82',
                    border: 'none',
                    borderRadius: 'var(--radius-xl)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                    fontFamily: 'var(--font-body)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  📍 Book On-Route
                </button>

                <button
                  onClick={() => navigate('/services')}
                  style={{
                    padding: 'var(--spacing-lg) var(--spacing-3xl)',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: 'var(--radius-xl)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    backdropFilter: 'blur(10px)',
                    fontFamily: 'var(--font-body)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.color = '#5A2D82';
                    e.target.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  🏠 Book On-Site
                </button>
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex',
                gap: 'var(--spacing-3xl)',
                marginTop: 'var(--spacing-3xl)',
                flexWrap: 'wrap'
              }}>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '4px' }}>10k+</div>
                  <div style={{ opacity: 0.9, fontSize: '0.9375rem' }}>Happy Clients</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '4px' }}>500+</div>
                  <div style={{ opacity: 0.9, fontSize: '0.9375rem' }}>Professionals</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '4px' }}>4.9★</div>
                  <div style={{ opacity: 0.9, fontSize: '0.9375rem' }}>Average Rating</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div style={{
              position: 'relative',
              animation: 'fadeInRight 1s ease-out 0.3s backwards'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-3xl)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                animation: 'floatSlow 6s ease-in-out infinite'
              }}>
                <div style={{
                  fontSize: '12rem',
                  textAlign: 'center',
                  filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))'
                }}>
                  💆‍♀️
                </div>
                <p style={{
                  textAlign: 'center',
                  fontSize: '1.125rem',
                  marginTop: 'var(--spacing-lg)',
                  opacity: 0.95
                }}>
                  Premium Beauty Experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite',
          color: 'white',
          opacity: 0.8
        }}>
          <div style={{ fontSize: '2rem' }}>↓</div>
          <div style={{ fontSize: '0.875rem', marginTop: '8px' }}>Scroll to explore</div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: 'var(--spacing-3xl) var(--spacing-xl)',
        background: 'var(--surface)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'var(--spacing-3xl) 0'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
            <Badge variant="primary" style={{ marginBottom: 'var(--spacing-md)' }}>
              Simple Process
            </Badge>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--text-primary)'
            }}>
              How It Works
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Book luxury beauty services in four simple steps
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--spacing-xl)'
          }}>
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--background)',
                  padding: 'var(--spacing-3xl)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px var(--shadow-light)';
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: 'var(--border-color)',
                  fontFamily: 'var(--font-heading)',
                  opacity: 0.3
                }}>
                  {step.number}
                </div>
                <div style={{
                  fontSize: '3.5rem',
                  marginBottom: 'var(--spacing-lg)'
                }}>
                  {step.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  marginBottom: 'var(--spacing-md)',
                  color: 'var(--text-primary)',
                  fontWeight: '700'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6'
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{
        padding: 'var(--spacing-3xl) var(--spacing-xl)',
        background: 'var(--background)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'var(--spacing-3xl) 0'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
            <Badge variant="primary" style={{ marginBottom: 'var(--spacing-md)' }}>
              Our Services
            </Badge>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--text-primary)'
            }}>
              Premium Beauty Services
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              From hair to nails, we offer comprehensive beauty solutions
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--spacing-xl)'
          }}>
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => navigate('/services')}
                style={{
                  background: service.gradient,
                  padding: 'var(--spacing-3xl)',
                  borderRadius: 'var(--radius-xl)',
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-16px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  filter: 'blur(40px)'
                }} />
                <div style={{
                  fontSize: '4rem',
                  marginBottom: 'var(--spacing-lg)',
                  position: 'relative',
                  animation: 'float 3s ease-in-out infinite'
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  position: 'relative'
                }}>
                  {service.name}
                </h3>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-3xl)' }}>
            <button
              onClick={() => navigate('/services')}
              className="btn-primary"
              style={{
                padding: 'var(--spacing-lg) var(--spacing-3xl)',
                fontSize: '1.125rem'
              }}
            >
              View All Services →
            </button>
          </div>
        </div>
      </section>

      {/* On-Route vs On-Site Section */}
      <section style={{
        padding: 'var(--spacing-3xl) var(--spacing-xl)',
        background: 'linear-gradient(135deg, #F7F7F7 0%, #FFFFFF 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'var(--spacing-3xl) 0'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
            <Badge variant="primary" style={{ marginBottom: 'var(--spacing-md)' }}>
              Two Ways to Book
            </Badge>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--text-primary)'
            }}>
              Choose Your Experience
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'var(--spacing-3xl)'
          }}>
            {/* On-Route */}
            <div style={{
              background: 'linear-gradient(135deg, #5A2D82 0%, #7C3AED 100%)',
              padding: 'var(--spacing-3xl)',
              borderRadius: 'var(--radius-xl)',
              color: 'white',
              transition: 'all 0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                filter: 'blur(60px)'
              }} />
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>📍</div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)'
              }}>
                On-Route
              </h3>
              <p style={{
                fontSize: '1.125rem',
                marginBottom: 'var(--spacing-xl)',
                opacity: 0.95,
                lineHeight: '1.6'
              }}>
                Visit our partner salons and beauty providers
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 var(--spacing-xl) 0'
              }}>
                {['Professional salon experience', 'Full equipment & facilities', 'Wide service selection', 'Instant booking available'].map((item, i) => (
                  <li key={i} style={{
                    padding: 'var(--spacing-sm) 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)'
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/services')}
                style={{
                  padding: 'var(--spacing-md) var(--spacing-xl)',
                  background: 'white',
                  color: '#5A2D82',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  width: '100%',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Book On-Route →
              </button>
            </div>

            {/* On-Site */}
            <div style={{
              background: 'linear-gradient(135deg, #F1C0E8 0%, #F9A8D4 100%)',
              padding: 'var(--spacing-3xl)',
              borderRadius: 'var(--radius-xl)',
              color: '#5A2D82',
              transition: 'all 0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.3)',
                filter: 'blur(60px)'
              }} />
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>🏠</div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)'
              }}>
                On-Site
              </h3>
              <p style={{
                fontSize: '1.125rem',
                marginBottom: 'var(--spacing-xl)',
                opacity: 0.95,
                lineHeight: '1.6'
              }}>
                Beauticians come to your location
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 var(--spacing-xl) 0'
              }}>
                {['Ultimate convenience', 'Privacy & comfort', 'Flexible scheduling', 'Real-time tracking'].map((item, i) => (
                  <li key={i} style={{
                    padding: 'var(--spacing-sm) 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)'
                  }}>
                    <span style={{ fontSize: '1.25rem' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/services')}
                style={{
                  padding: 'var(--spacing-md) var(--spacing-xl)',
                  background: '#5A2D82',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  width: '100%',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Book On-Site →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Zoo Beauty Palace */}
      <section style={{
        padding: 'var(--spacing-3xl) var(--spacing-xl)',
        background: 'var(--surface)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'var(--spacing-3xl) 0'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
            <Badge variant="primary" style={{ marginBottom: 'var(--spacing-md)' }}>
              Why Choose Us
            </Badge>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--text-primary)'
            }}>
              The Zoo Beauty Difference
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              We're not just a booking platform, we're your beauty concierge
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--spacing-xl)'
          }}>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--background)',
                  padding: 'var(--spacing-xl)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.3s',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.boxShadow = '0 12px 40px var(--shadow-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  marginBottom: 'var(--spacing-lg)',
                  color: 'white',
                  fontWeight: '700'
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.375rem',
                  fontWeight: '700',
                  marginBottom: 'var(--spacing-sm)',
                  color: 'var(--text-primary)'
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6'
                }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{
        padding: 'var(--spacing-3xl) var(--spacing-xl)',
        background: 'linear-gradient(135deg, #5A2D82 0%, #7C3AED 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'rgba(241, 192, 232, 0.1)',
          filter: 'blur(100px)'
        }} />

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: 'var(--spacing-3xl) 0',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
            <Badge 
              variant="default" 
              style={{ 
                marginBottom: 'var(--spacing-md)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}
            >
              Testimonials
            </Badge>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: 'var(--spacing-lg)'
            }}>
              Loved by Thousands
            </h2>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            padding: 'var(--spacing-3xl)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF9F1C, #FBBF24)',
              margin: '0 auto var(--spacing-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: '700',
              color: 'white',
              border: '4px solid rgba(255, 255, 255, 0.2)'
            }}>
              {testimonials[activeTestimonial].photo}
            </div>
            
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              {'★'.repeat(testimonials[activeTestimonial].rating).split('').map((star, i) => (
                <span key={i} style={{ color: '#FFD700', fontSize: '1.5rem', marginRight: '4px' }}>{star}</span>
              ))}
            </div>

            <p style={{
              fontSize: '1.375rem',
              lineHeight: '1.8',
              marginBottom: 'var(--spacing-xl)',
              fontStyle: 'italic',
              maxWidth: '700px',
              margin: '0 auto var(--spacing-xl)'
            }}>
              "{testimonials[activeTestimonial].quote}"
            </p>

            <div>
              <div style={{
                fontWeight: '700',
                fontSize: '1.125rem',
                marginBottom: '4px'
              }}>
                {testimonials[activeTestimonial].name}
              </div>
              <div style={{ opacity: 0.9, fontSize: '0.9375rem' }}>
                {testimonials[activeTestimonial].role}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--spacing-sm)',
            marginTop: 'var(--spacing-xl)'
          }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                style={{
                  width: activeTestimonial === index ? '40px' : '12px',
                  height: '12px',
                  borderRadius: '999px',
                  background: activeTestimonial === index ? 'white' : 'rgba(255, 255, 255, 0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section style={{
        padding: 'var(--spacing-3xl) var(--spacing-xl)',
        background: 'var(--background)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'var(--spacing-3xl) 0',
          textAlign: 'center'
        }}>
          <Badge variant="primary" style={{ marginBottom: 'var(--spacing-md)' }}>
            Coming Soon
          </Badge>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            marginBottom: 'var(--spacing-lg)',
            color: 'var(--text-primary)'
          }}>
            Beauty at Your Fingertips
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto var(--spacing-3xl)'
          }}>
            Download our mobile app for the ultimate booking experience
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--spacing-3xl)',
            marginBottom: 'var(--spacing-3xl)'
          }}>
            <div style={{
              width: '200px',
              height: '400px',
              background: 'linear-gradient(135deg, #5A2D82 0%, #7C3AED 100%)',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              boxShadow: '0 20px 60px rgba(90, 45, 130, 0.4)',
              animation: 'floatSlow 4s ease-in-out infinite',
              border: '8px solid #222'
            }}>
              📱
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              style={{
                padding: 'var(--spacing-md) var(--spacing-xl)',
                background: '#000',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: '1.5rem' }}>🍎</span>
              App Store
            </button>
            <button
              style={{
                padding: 'var(--spacing-md) var(--spacing-xl)',
                background: '#000',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: '1.5rem' }}>🤖</span>
              Google Play
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: 'var(--spacing-3xl) var(--spacing-xl)',
        background: 'linear-gradient(135deg, #FF9F1C 0%, #FBBF24 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />

        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'var(--spacing-3xl) 0',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '700',
            marginBottom: 'var(--spacing-lg)',
            lineHeight: '1.2'
          }}>
            Ready to Experience Luxury?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: 'var(--spacing-3xl)',
            opacity: 0.95,
            lineHeight: '1.8'
          }}>
            Join thousands of satisfied clients who've discovered the easiest way to book premium beauty services
          </p>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: 'var(--spacing-xl) var(--spacing-3xl)',
              fontSize: '1.25rem',
              fontWeight: '700',
              background: 'white',
              color: '#FF9F1C',
              border: 'none',
              borderRadius: 'var(--radius-xl)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              fontFamily: 'var(--font-body)',
              animation: 'pulse 2s infinite'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px) scale(1.05)';
              e.target.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
            }}
          >
            Get Started Now ✨
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#1a1a1a',
        color: 'white',
        padding: 'var(--spacing-3xl) var(--spacing-xl)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--spacing-3xl)',
            marginBottom: 'var(--spacing-3xl)'
          }}>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.75rem',
                marginBottom: 'var(--spacing-md)',
                color: '#FF9F1C'
              }}>
                Zoo Beauty Palace
              </h3>
              <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
                Your trusted platform for premium beauty services, on-route or on-site.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: 'var(--spacing-md)', fontWeight: '700' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['About Us', 'Services', 'Become a Provider', 'FAQ', 'Contact'].map((link, i) => (
                  <li key={i} style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <a href="#" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.target.style.color = '#FF9F1C'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: 'var(--spacing-md)', fontWeight: '700' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'].map((link, i) => (
                  <li key={i} style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <a href="#" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.target.style.color = '#FF9F1C'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: 'var(--spacing-md)', fontWeight: '700' }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                {['📘', '📸', '🐦', '💼'].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#FF9F1C';
                      e.target.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: 'var(--spacing-xl)',
            textAlign: 'center',
            opacity: 0.8
          }}>
            <p>&copy; 2025 Zoo Beauty Palace. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Global Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); }
          50% { box-shadow: 0 20px 60px rgba(255, 159, 28, 0.6); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
