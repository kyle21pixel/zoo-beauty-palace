import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const services = [
    { name: 'Wig Installation', description: 'Professional wig fitting, styling and maintenance services', icon: '💇‍♀️' },
    { name: 'Braiding', description: 'Expert braiding styles from classic to contemporary', icon: '✨' },
    { name: 'Barbering', description: 'Premium haircuts and grooming by skilled barbers', icon: '✂️' },
    { name: 'Nails', description: 'Manicures, pedicures, and custom nail art', icon: '💅' },
    { name: 'Massage', description: 'Relaxing and therapeutic massage treatments', icon: '💆‍♀️' },
    { name: 'Tattooing', description: 'Custom tattoos by award-winning artists', icon: '🎨' },
  ];

  return (
    <div className="homepage" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section - Luxury & Minimal */}
      <header className="hero-section" style={{ 
        backgroundColor: 'white',
        padding: '96px 48px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '4rem', 
            marginBottom: '24px', 
            fontWeight: '700', 
            lineHeight: '1.1',
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em'
          }}>
            Your Personal Beauty <br/>
            <span style={{ 
              background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Concierge</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '48px', 
            color: 'var(--text-secondary)', 
            lineHeight: '1.7',
            maxWidth: '700px',
            margin: '0 auto 48px',
            fontWeight: '400'
          }}>
            Premium beauty services from vetted professionals. Book instantly, relax completely.
          </p>
          <div className="cta-buttons" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn btn-primary" style={{ 
              padding: '16px 40px', 
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-color)',
              color: 'white',
              display: 'inline-block',
              transition: 'all 0.3s'
            }}>
              Browse Services
            </Link>
            <Link to="/register" className="btn" style={{ 
              padding: '16px 40px', 
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              borderRadius: 'var(--radius-md)',
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)',
              display: 'inline-block',
              transition: 'all 0.3s'
            }}>
              Join as Provider
            </Link>
          </div>
        </div>
      </header>

      {/* Services Section - Card-Based Luxury Layout */}
      <section className="services-section" style={{ padding: '96px 48px', backgroundColor: 'var(--surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--accent-color)', 
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Our Services
            </p>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: '3rem', 
              marginBottom: '16px', 
              color: 'var(--text-primary)', 
              fontWeight: '700',
              letterSpacing: '-0.02em'
            }}>
              Experience Excellence
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
              Professional beauty services curated for your lifestyle
            </p>
          </div>
          <div className="services-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
            gap: 'var(--spacing-lg)'
          }}>
            {services.map((service, index) => (
              <div 
                key={index}
                className="service-card" 
                style={{ 
                  background: 'white',
                  padding: 'var(--spacing-xl)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 2px 12px var(--shadow-light)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px var(--shadow-medium)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px var(--shadow-light)';
                }}
              >
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: 'var(--spacing-md)',
                  display: 'inline-block'
                }}>
                  {service.icon}
                </div>
                <h3 style={{ 
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--text-primary)', 
                  marginBottom: 'var(--spacing-sm)', 
                  fontSize: '1.5rem', 
                  fontWeight: '700',
                  letterSpacing: '-0.01em'
                }}>
                  {service.name}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.9375rem', 
                  lineHeight: '1.7', 
                  marginBottom: 'var(--spacing-md)'
                }}>
                  {service.description}
                </p>
                <Link to="/services" style={{ 
                  color: 'var(--primary-color)', 
                  fontWeight: '600', 
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-xs)',
                  fontSize: '0.9375rem',
                  transition: 'gap 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.gap = 'var(--spacing-sm)'}
                onMouseLeave={(e) => e.currentTarget.style.gap = 'var(--spacing-xs)'}>
                  Explore <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Minimal & Elegant */}
      <section className="how-it-works" style={{ padding: '96px 48px', backgroundColor: 'var(--background)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--accent-color)', 
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Simple Process
            </p>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: '3rem', 
              marginBottom: '16px', 
              color: 'var(--text-primary)', 
              fontWeight: '700',
              letterSpacing: '-0.02em'
            }}>
              Book in Minutes
            </h2>
          </div>
          <div className="steps" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: 'var(--spacing-xl)'
          }}>
            {[
              { num: '01', title: 'Choose', desc: 'Browse our curated selection of premium beauty services' },
              { num: '02', title: 'Select', desc: 'Pick from vetted on-site or on-route professionals' },
              { num: '03', title: 'Book', desc: 'Schedule instantly at your convenience' },
              { num: '04', title: 'Relax', desc: 'Enjoy your service at home or in-salon' }
            ].map((step, index) => (
              <div key={index} className="step" style={{ 
                backgroundColor: 'white',
                padding: 'var(--spacing-xl)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 2px 12px var(--shadow-light)',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '3rem', 
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '700', 
                  color: 'var(--secondary-color)',
                  marginBottom: 'var(--spacing-md)',
                  opacity: 0.6
                }}>
                  {step.num}
                </div>
                <h3 style={{ 
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--text-primary)', 
                  marginBottom: 'var(--spacing-sm)', 
                  fontSize: '1.5rem', 
                  fontWeight: '700',
                  letterSpacing: '-0.01em'
                }}>
                  {step.title}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  lineHeight: '1.7',
                  fontSize: '0.9375rem'
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Luxury Minimal */}
      <section style={{ 
        padding: '96px 48px',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '3rem', 
            marginBottom: '24px', 
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }}>
            Ready to Begin?
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            marginBottom: '48px', 
            opacity: 0.9,
            lineHeight: '1.7'
          }}>
            Join our community of beauty enthusiasts and professionals
          </p>
          <Link to="/register" className="btn" style={{ 
            background: 'white',
            color: 'var(--primary-color)',
            padding: '16px 48px',
            fontSize: '16px',
            fontWeight: '600',
            textDecoration: 'none',
            borderRadius: 'var(--radius-md)',
            display: 'inline-block',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
          }}>
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
