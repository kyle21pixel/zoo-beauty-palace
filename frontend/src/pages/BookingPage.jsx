import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { bookingAPI, serviceAPI } from '../services/api';
import { handleApiCall } from '../utils/apiUtils';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  const serviceName = searchParams.get('serviceName') || 'Service';
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    service: serviceId || '',
    bookingType: 'on-site',
    location: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    if (serviceId) {
      fetchServiceDetails();
    }
  }, [serviceId]);

  const fetchServiceDetails = async () => {
    try {
      const result = await handleApiCall(
        () => serviceAPI.getById(serviceId),
        setLoading,
        setError
      );
      setService(result.data.service);
      setFormData(prev => ({
        ...prev,
        service: serviceId
      }));
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await handleApiCall(
        () => bookingAPI.create(formData),
        setLoading,
        setError
      );
      
      if (result.success) {
        alert('Booking created successfully!');
        navigate('/client'); // Redirect to client dashboard
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  if (loading && !service) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading booking details...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: '#DC3545',
        fontSize: '18px'
      }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className="booking-page" style={{ padding: '40px 20px', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#5A2D82' }}>Book {decodeURIComponent(serviceName)}</h2>
        {service && (
          <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#5A2D82' }}>{service.name}</h3>
            <p style={{ margin: '0 0 10px 0', color: '#666' }}>{service.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span>Duration: {service.duration} min</span>
              <span>Price: ${service.price.min} - ${service.price.max}</span>
            </div>
          </div>
        )}
        <div className="booking-form">
          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold', color: '#333' }}>Service Type</label>
            <div className="radio-group" style={{ display: 'flex', gap: '30px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="bookingType"
                  value="on-site"
                  checked={formData.bookingType === 'on-site'}
                  onChange={handleChange}
                  style={{ marginRight: '8px' }}
                />
                On-site (at your location)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="bookingType"
                  value="on-route"
                  checked={formData.bookingType === 'on-route'}
                  onChange={handleChange}
                  style={{ marginRight: '8px' }}
                />
                On-route (at provider location)
              </label>
            </div>
          </div>

          <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Service Date</label>
              <input
                type="date"
                className="form-input"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Service Time</label>
              <input
                type="time"
                className="form-input"
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
                required
              />
            </div>
          </div>

          {formData.bookingType === 'on-site' && (
            <div className="form-group" style={{ marginBottom: '25px' }}>
              <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Your Address</label>
              <textarea
                className="form-input"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your address for on-site service"
                rows="3"
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
                required={formData.bookingType === 'on-site'}
              ></textarea>
            </div>
          )}

          {formData.bookingType === 'on-route' && (
            <div className="form-group" style={{ marginBottom: '25px' }}>
              <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Select Provider Location</label>
              <select className="form-input" name="location" value={formData.location} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}>
                <option value="">Select a provider location</option>
                <option value="Downtown Salon">Downtown Salon</option>
                <option value="Uptown Beauty Center">Uptown Beauty Center</option>
                <option value="Midtown Spa">Midtown Spa</option>
              </select>
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Special Requests</label>
            <textarea
              className="form-input"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special requests or notes"
              rows="3"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
            ></textarea>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '15px', fontSize: '18px' }}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;