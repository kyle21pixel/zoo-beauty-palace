import React from 'react';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero-section" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#5A2D82' }}>Welcome to Zoo Beauty Palace</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#666' }}>Book beauty services from top providers and freelancers</p>
        <div className="cta-buttons">
          <button className="btn btn-primary" style={{ marginRight: '15px', padding: '12px 30px', fontSize: '1.1rem' }}>Book a Service</button>
          <button className="btn btn-secondary" style={{ padding: '12px 30px', fontSize: '1.1rem' }}>Become a Provider</button>
        </div>
      </header>

      <section className="services-section" style={{ padding: '40px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#5A2D82' }}>Our Services</h2>
        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="service-card" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <h3 style={{ color: '#5A2D82', marginBottom: '10px' }}>Wig Installation</h3>
            <p>Professional wig fitting and styling</p>
            <button className="btn btn-primary" style={{ marginTop: '15px' }}>Learn More</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <h3 style={{ color: '#5A2D82', marginBottom: '10px' }}>Braiding</h3>
            <p>Various braiding styles and techniques</p>
            <button className="btn btn-primary" style={{ marginTop: '15px' }}>Learn More</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <h3 style={{ color: '#5A2D82', marginBottom: '10px' }}>Barbering</h3>
            <p>Haircuts and grooming services</p>
            <button className="btn btn-primary" style={{ marginTop: '15px' }}>Learn More</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <h3 style={{ color: '#5A2D82', marginBottom: '10px' }}>Nails</h3>
            <p>Manicures, pedicures, and nail art</p>
            <button className="btn btn-primary" style={{ marginTop: '15px' }}>Learn More</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <h3 style={{ color: '#5A2D82', marginBottom: '10px' }}>Massage</h3>
            <p>Relaxing and therapeutic massages</p>
            <button className="btn btn-primary" style={{ marginTop: '15px' }}>Learn More</button>
          </div>
          <div className="service-card" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <h3 style={{ color: '#5A2D82', marginBottom: '10px' }}>Tattooing</h3>
            <p>Custom tattoos by skilled artists</p>
            <button className="btn btn-primary" style={{ marginTop: '15px' }}>Learn More</button>
          </div>
        </div>
      </section>

      <section className="how-it-works" style={{ padding: '60px 20px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#5A2D82' }}>How It Works</h2>
        <div className="steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="step" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF4C61', marginBottom: '15px' }}>1</div>
            <h3 style={{ color: '#5A2D82', marginBottom: '10px' }}>Choose Service</h3>
            <p>Select from our wide range of beauty services</p>
          </div>
          <div className="step" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF4C61', marginBottom: '15px' }}>2</div>
            <h3 style={{ color: '#5A2D82', marginBottom: '10px' }}>Select Provider</h3>
            <p>Choose between on-route providers or on-site freelancers</p>
          </div>
          <div className="step" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF4C61', marginBottom: '15px' }}>3</div>
            <h3 style={{ color: '#5A2D82', marginBottom: '10px' }}>Book Appointment</h3>
            <p>Schedule your service at your convenience</p>
          </div>
          <div className="step" style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF4C61', marginBottom: '15px' }}>4</div>
            <h3 style={{ color: '#5A2D82', marginBottom: '10px' }}>Enjoy Service</h3>
            <p>Get your service at provider location or at your home</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;