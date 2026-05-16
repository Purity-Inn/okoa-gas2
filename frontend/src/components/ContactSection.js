import React, { useState, useEffect, useRef } from 'react';

const ContactSection = ({ screenSize, theme, showMessage }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      ref={sectionRef}
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
          fontWeight: '800',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        Get in Touch
      </h2>
      <p
        style={{
          textAlign: 'center',
          color: theme.gray,
          marginBottom: '2.5rem',
          fontSize: '1.05rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out 0.2s'
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
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'all 0.8s ease-out 0.4s'
          }}
        >
          {['name', 'email', 'phone', 'subject'].map((field, idx) => (
            <input
              key={field}
              type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
              name={field}
              placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}${field === 'name' || field === 'email' || field === 'message' ? ' *' : ''}`}
              value={contactForm[field]}
              onChange={handleInputChange}
              style={{
                padding: '0.75rem',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                opacity: isVisible ? 1 : 0,
                animation: isVisible ? `fadeInUp 0.5s ease-out ${0.5 + idx * 0.1}s forwards` : 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.primary;
                e.target.style.boxShadow = `0 0 0 3px ${theme.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
                e.target.style.boxShadow = 'none';
              }}
            />
          ))}
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
              transition: 'all 0.3s ease',
              resize: 'vertical',
              opacity: isVisible ? 1 : 0,
              animation: isVisible ? `fadeInUp 0.5s ease-out 0.9s forwards` : 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.primary;
              e.target.style.boxShadow = `0 0 0 3px ${theme.primary}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
              e.target.style.boxShadow = 'none';
            }}
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
              opacity: isSubmitting ? 0.7 : (isVisible ? 1 : 0),
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              animation: isVisible ? `fadeInUp 0.5s ease-out 1s forwards` : 'none'
            }}
            onMouseEnter={(e) => !isSubmitting && (e.target.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !isSubmitting && (e.target.style.transform = 'translateY(0)')}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Contact Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'all 0.8s ease-out 0.5s'
          }}
        >
          {[
            { title: '📞 Phone', value: '+254 717 052 939', link: 'tel:+254717052939', gradient: false },
            { title: '📧 Email', value: 'okoagas.energy@gmail.com', link: 'mailto:okoagas.energy@gmail.com', gradient: false },
            { title: '🕒 Business Hours', value: null, isHours: true, gradient: false },
            { title: '📍 Our Location', value: 'Nairobi, Kenya', isLocation: true, gradient: true }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: item.gradient
                  ? `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`
                  : 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                border: item.gradient ? 'none' : `2px solid ${theme.primary}20`,
                color: item.gradient ? 'white' : 'inherit',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease-out ${0.6 + idx * 0.15}s`,
                boxShadow: item.gradient ? '0 8px 25px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.05)'
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: item.gradient ? 'white' : theme.primary, marginBottom: '0.75rem' }}>
                {item.title}
              </h3>
              {item.isHours ? (
                <p style={{ color: item.gradient ? 'white' : theme.gray, fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Monday - Friday: 8:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 2:00 PM<br />
                  Sunday: Closed<br />
                  <span style={{ fontWeight: '700', color: theme.primary }}>24/7 Emergency Support</span>
                </p>
              ) : item.isLocation ? (
                <>
                  <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'white' }}>
                    {item.value}
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
                </>
              ) : (
                <a
                  href={item.link}
                  style={{
                    color: item.gradient ? 'white' : theme.gray,
                    textDecoration: 'none',
                    fontSize: '1rem',
                    display: 'block'
                  }}
                >
                  {item.value}
                </a>
              )}
            </div>
          ))}

          {/* Quick Links */}
          <div
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
              borderRadius: '12px',
              padding: '1.5rem',
              color: 'white',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.6s ease-out 1.2s`
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>
              🚀 Quick Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem' }}>
              <a href="#home" style={{ color: 'white', textDecoration: 'none', display: 'block', transition: 'transform 0.2s' }}>→ Home</a>
              <a href="#features" style={{ color: 'white', textDecoration: 'none', display: 'block', transition: 'transform 0.2s' }}>→ Features</a>
              <a href="#safety" style={{ color: 'white', textDecoration: 'none', display: 'block', transition: 'transform 0.2s' }}>→ Safety</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
