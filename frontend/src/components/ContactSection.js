import React, { useState, useEffect, useRef } from 'react';

const ContactSection = ({ screenSize, theme, showMessage }) => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Nairobi coordinates
  const coordinates = { lat: -1.286389, lng: 36.817223 };

  useEffect(() => {
    if (!mapLoaded && !mapInstanceRef.current) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        setMapLoaded(true);
      };
      document.head.appendChild(script);
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (mapLoaded && mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = window.L.map(mapRef.current).setView(
        [coordinates.lat, coordinates.lng],
        13
      );

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      window.L.marker([coordinates.lat, coordinates.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup('OKOA GAS Headquarters<br>Nairobi, Kenya')
        .openPopup();
    }
  }, [mapLoaded, coordinates.lat, coordinates.lng]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      showMessage('✅ Message sent successfully! We\'ll get back to you soon.', 'success');
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div
      style={{
        background: '#f8f9fa',
        padding: screenSize.isMobile ? '3rem 1rem' : '4rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: screenSize.isMobile ? '2rem' : '2.5rem',
          color: theme.dark,
          marginBottom: '0.5rem',
          fontWeight: '800'
        }}
      >
        Get in Touch
      </h2>
      <p
        style={{
          textAlign: 'center',
          color: theme.gray,
          marginBottom: '2.5rem',
          fontSize: '1.05rem'
        }}
      >
        Questions? We're here to help. Contact us anytime.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: screenSize.isMobile ? '1fr' : '1fr 1fr',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        {/* Contact Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={contactForm.name}
            onChange={handleInputChange}
            style={{
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border 0.3s ease'
            }}
            onFocus={(e) => (e.target.style.borderColor = theme.primary)}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={contactForm.email}
            onChange={handleInputChange}
            style={{
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border 0.3s ease'
            }}
            onFocus={(e) => (e.target.style.borderColor = theme.primary)}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (optional)"
            value={contactForm.phone}
            onChange={handleInputChange}
            style={{
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border 0.3s ease'
            }}
            onFocus={(e) => (e.target.style.borderColor = theme.primary)}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={contactForm.subject}
            onChange={handleInputChange}
            style={{
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border 0.3s ease'
            }}
            onFocus={(e) => (e.target.style.borderColor = theme.primary)}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
          <textarea
            name="message"
            placeholder="Your Message *"
            value={contactForm.message}
            onChange={handleInputChange}
            rows="5"
            style={{
              padding: '0.75rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              transition: 'border 0.3s ease',
              resize: 'vertical'
            }}
            onFocus={(e) => (e.target.style.borderColor = theme.primary)}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: theme.primary,
              color: 'white',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => !isSubmitting && (e.target.style.opacity = '0.9')}
            onMouseLeave={(e) => !isSubmitting && (e.target.style.opacity = '1')}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              border: `2px solid ${theme.primary}20`
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: theme.primary, marginBottom: '0.75rem' }}>
              📞 Phone
            </h3>
            <a
              href="tel:+254717052939"
              style={{
                color: theme.gray,
                textDecoration: 'none',
                fontSize: '1rem'
              }}
            >
              +254 717 052 939
            </a>
          </div>

          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              border: `2px solid ${theme.primary}20`
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: theme.primary, marginBottom: '0.75rem' }}>
              📧 Email
            </h3>
            <a
              href="mailto:okoagas.energy@gmail.com"
              style={{
                color: theme.gray,
                textDecoration: 'none',
                fontSize: '1rem'
              }}
            >
              okoagas.energy@gmail.com
            </a>
          </div>

          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              border: `2px solid ${theme.primary}20`
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: theme.primary, marginBottom: '0.75rem' }}>
              🕒 Business Hours
            </h3>
            <p style={{ color: theme.gray, fontSize: '0.95rem', lineHeight: '1.6' }}>
              Monday - Friday: 8:00 AM - 6:00 PM<br />
              Saturday: 9:00 AM - 2:00 PM<br />
              Sunday: Closed<br />
              <span style={{ fontWeight: '700', color: theme.primary }}>24/7 Emergency Support</span>
            </p>
          </div>

          <div
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
              borderRadius: '12px',
              padding: '1.5rem',
              color: 'white'
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>
              📍 Our Location
            </h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Nairobi, Kenya
            </p>
            <div
              ref={mapRef}
              style={{
                width: '100%',
                height: '150px',
                borderRadius: '8px',
                overflow: 'hidden',
                marginTop: '0.5rem'
              }}
            />
            {!mapLoaded && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.8)' }}>
                Loading map...
              </div>
            )}
          </div>

          <div
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
              borderRadius: '12px',
              padding: '1.5rem',
              color: 'white'
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>
              🚀 Quick Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
              <a href="#home" style={{ color: 'white', textDecoration: 'none' }}>→ Home</a>
              <a href="#features" style={{ color: 'white', textDecoration: 'none' }}>→ Features</a>
              <a href="#safety" style={{ color: 'white', textDecoration: 'none' }}>→ Safety</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
