import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/Badge';
import ServiceCard from '../components/ServiceCard';
import Footer from '../components/Footer';

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
    { 
      id: 1,
      name: 'Wig Installation', 
      description: 'Professional wig installation including customization, styling, and secure fitting for a natural look.',
      price: 85,
      duration: 120,
      category: 'hair',
      icon: '👸', 
      isPopular: true
    },
    { 
      id: 2,
      name: 'Luxury Braiding', 
      description: 'Intricate braiding styles including knotless, box braids, and cornrows with premium hair included.',
      price: 120,
      duration: 240,
      category: 'hair',
      icon: '💁',
      isPopular: true
    },
    { 
      id: 3,
      name: 'Premium Barbering', 
      description: 'Precision cuts, beard grooming, and hot towel treatment for the modern gentleman.',
      price: 45,
      duration: 60,
      category: 'barber',
      icon: '✂️' 
    },
    { 
      id: 4,
      name: 'Gel Manicure', 
      description: 'Long-lasting gel polish with cuticle care, hand massage, and premium nail art options.',
      price: 55,
      duration: 75,
      category: 'nails',
      icon: '💅' 
    },
    { 
      id: 5,
      name: 'Deep Tissue Massage', 
      description: 'Therapeutic massage focusing on realigning deeper layers of muscles and connective tissue.',
      price: 95,
      duration: 90,
      category: 'massage',
      icon: '💆' 
    },
    { 
      id: 6,
      name: 'Custom Tattoo', 
      description: 'Bespoke tattoo artistry from award-winning artists in a sterile, comfortable environment.',
      price: 150,
      duration: 180,
      category: 'tattoo',
      icon: '🎨' 
    }
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

  // Animation controls for scroll reveals
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ 
        background: 'var(--background)',
        color: 'var(--text-primary)',
        overflowX: 'hidden'
      }}
    >
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
        }}
        ref={ref}
        style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #5A2D82 0%, #7C3AED 50%, #F1C0E8 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px'
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
            <motion.div 
              className="animate-fade-in-up"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ color: 'white' }}
            >
              <Badge 
                variant="default" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  marginBottom: 'var(--spacing-lg)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                ✨ Premium Beauty Services
              </Badge>
              
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                fontWeight: '700',
                lineHeight: '1.1',
                marginBottom: 'var(--spacing-xl)',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                Luxury Beauty,<br />
                <span className="gradient-text-gold">
                  Delivered to You
                </span>
              </h1>

              <p style={{
                fontSize: '1.25rem',
                lineHeight: '1.8',
                marginBottom: 'var(--spacing-3xl)',
                opacity: 0.95,
                maxWidth: '600px',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Experience premium beauty services at your doorstep or visit our partner salons. 
                Verified professionals, flexible booking, luxury experience.
              </p>

              <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                <motion.button
                  onClick={() => navigate('/services')}
                  className="animate-pulse-glow"
                  whileHover={{ scale: 1.07, boxShadow: '0 8px 24px rgba(90,45,130,0.18)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '16px 32px',
                    background: 'white',
                    color: 'var(--primary-color)',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  Book Now
                </motion.button>
                <motion.button
                  onClick={() => navigate('/register')}
                  whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '16px 32px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)'
                  }}
                >
                  Join as Pro
                </motion.button>
              </div>
            </motion.div>

            {/* Right Image/Illustration */}
            <motion.div 
              className="animate-float"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{
              position: 'relative',
              height: '600px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                background: 'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                border: '4px solid rgba(255,255,255,0.2)',
                animation: 'morph 8s ease-in-out infinite'
              }}>
                <style>{`
                  @keyframes morph {
                    0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                  }
                `}</style>
              </div>
              
              {/* Floating Cards */}
              <motion.div 
                className="glass-panel animate-float delay-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                position: 'absolute',
                top: '20%',
                left: '-10%',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                zIndex: 2
              }}>
                <span style={{ fontSize: '1.5rem' }}>⭐</span>
                <div>
                  <p style={{ margin: 0, fontWeight: '700', color: 'var(--primary-color)' }}>4.9/5</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Client Rating</p>
                </div>
              </motion.div>

              <motion.div 
                className="glass-panel animate-float delay-500"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{
                position: 'absolute',
                bottom: '15%',
                right: '-5%',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                zIndex: 2
              }}>
                <span style={{ fontSize: '1.5rem' }}>🛡️</span>
                <div>
                  <p style={{ margin: 0, fontWeight: '700', color: 'var(--primary-color)' }}>Verified</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Professionals</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
        }}
        style={{ padding: 'var(--spacing-4xl) 0', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--spacing-3xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
            <Badge variant="primary" style={{ marginBottom: 'var(--spacing-md)' }}>Our Services</Badge>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: '3rem',
              fontWeight: '700',
              marginBottom: 'var(--spacing-md)'
            }}>
              Curated for <span className="gradient-text">Excellence</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              Choose from our wide range of premium beauty and wellness services
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: 'var(--spacing-xl)'
          }}>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`animate-fade-in-up delay-${index * 100}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                <ServiceCard service={service} onClick={() => navigate('/services')} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
        }}
        style={{ padding: 'var(--spacing-4xl) 0', position: 'relative' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--spacing-3xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
            <Badge variant="secondary" style={{ marginBottom: 'var(--spacing-md)' }}>Simple Process</Badge>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: '3rem',
              fontWeight: '700',
              marginBottom: 'var(--spacing-md)'
            }}>
              Beauty on Your Terms
            </h2>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 'var(--spacing-2xl)',
            position: 'relative'
          }}>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="luxury-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                style={{
                textAlign: 'center',
                padding: 'var(--spacing-xl)',
                background: 'var(--surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-color)',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, #7C3AED 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  margin: '0 auto var(--spacing-lg)',
                  color: 'white',
                  boxShadow: '0 10px 20px rgba(124, 58, 237, 0.3)'
                }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)', fontWeight: '700' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.description}</p>
                <div style={{
                  position: 'absolute',
                  top: 'var(--spacing-md)',
                  right: 'var(--spacing-md)',
                  fontSize: '4rem',
                  fontWeight: '900',
                  color: 'var(--border-color)',
                  opacity: 0.3,
                  zIndex: -1,
                  fontFamily: 'var(--font-heading)'
                }}>
                  {step.number}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
        }}
        style={{ 
        padding: 'var(--spacing-4xl) 0', 
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--background) 100%)',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--spacing-3xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
            <Badge variant="primary" style={{ marginBottom: 'var(--spacing-md)' }}>Testimonials</Badge>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: '3rem',
              fontWeight: '700'
            }}>
              Loved by Thousands
            </h2>
          </div>

          <div style={{ 
            position: 'relative', 
            maxWidth: '800px', 
            margin: '0 auto',
            height: '400px'
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  opacity: activeTestimonial === index ? 1 : 0,
                  transform: `translateX(${activeTestimonial === index ? '0' : '50px'})`,
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: activeTestimonial === index ? 'all' : 'none'
                }}
              >
                <div className="glass-panel" style={{
                  padding: 'var(--spacing-3xl)',
                  borderRadius: 'var(--radius-xl)',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.8)'
                }}>
                  <div style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: 'var(--spacing-lg)' }}>"</div>
                  <p style={{ 
                    fontSize: '1.5rem', 
                    lineHeight: 1.6, 
                    marginBottom: 'var(--spacing-xl)',
                    fontFamily: 'var(--font-heading)',
                    fontStyle: 'italic'
                  }}>
                    {testimonial.quote}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-md)' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'var(--primary-color)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '1.25rem'
                    }}>
                      {testimonial.photo}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '700' }}>{testimonial.name}</h4>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Dots Navigation */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 'var(--spacing-sm)'
            }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: activeTestimonial === index ? 'var(--primary-color)' : 'var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
        }}
        style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: 'var(--spacing-4xl)',
          background: 'linear-gradient(135deg, #5A2D82 0%, #7C3AED 100%)',
          borderRadius: 'var(--radius-2xl)',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(90, 45, 130, 0.3)'
        }}>
          <div className="shimmer-effect" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: '3.5rem',
              fontWeight: '700',
              marginBottom: 'var(--spacing-lg)'
            }}>
              Ready to Glow?
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              marginBottom: 'var(--spacing-2xl)', 
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto var(--spacing-2xl)'
            }}>
              Join thousands of satisfied clients who have transformed their beauty routine with Zoo Beauty Palace.
            </p>
            <motion.button
              onClick={() => navigate('/register')}
              className="animate-pulse-glow"
              whileHover={{ scale: 1.08, boxShadow: '0 15px 30px rgba(90,45,130,0.22)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '18px 48px',
                background: 'white',
                color: 'var(--primary-color)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                fontSize: '1.25rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }}
            >
              Get Started Today
            </motion.button>
          </div>
        </div>
      </motion.section>
      
      <Footer />
    </motion.div>
  );
};

export default LandingPage;
