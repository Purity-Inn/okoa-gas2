import React, { useState } from 'react';

const SignUpModal = ({
  showSignUpModal,
  setShowSignUpModal,
  screenSize,
  theme,
  showMessage
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    kitId: '6kg',
    instructions: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedKit, setSelectedKit] = useState('6kg');

  const kitOptions = [
    {
      id: '6kg',
      fullName: 'Family Starter Kit',
      size: '6kg',
      cooker: '2-Burner',
      icon: '🏠',
      description: 'Perfect for small families',
      monthly: 'from KES 500'
    },
    {
      id: '13kg',
      fullName: 'Family Plus Kit',
      size: '13kg',
      cooker: '3-Burner',
      icon: '👨‍👩‍👧‍👦',
      description: 'For larger families',
      monthly: 'from KES 800'
    },
    {
      id: 'commercial',
      fullName: 'Commercial Kit',
      size: '50kg',
      cooker: '6-Burner',
      icon: '🏪',
      description: 'For restaurants & shops',
      monthly: 'from KES 2,500'
    }
  ];

  if (!showSignUpModal) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name required';
    if (!formData.phone.trim()) errors.phone = 'Phone required';
    else if (!/^(\+254|0)[17]\d{8}$/.test(formData.phone)) errors.phone = 'Valid Kenyan phone required';
    if (!formData.location.trim()) errors.location = 'Location required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showMessage('Please fix the errors above', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      showMessage(`✅ Thank you ${formData.name}! Your free kit will be delivered soon.`, 'success');
      setIsSubmitting(false);
      setShowSignUpModal(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        kitId: '6kg',
        instructions: ''
      });
      setSelectedKit('6kg');
    }, 1500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflowY: 'auto'
      }}
      onClick={() => setShowSignUpModal(false)}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          maxWidth: screenSize.isMobile ? '100%' : '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: screenSize.isMobile ? '1.5rem' : '2rem',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowSignUpModal(false)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: theme.gray
          }}
        >
          ✕
        </button>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: theme.dark, fontWeight: '800' }}>
          Get Your Free Kit 🎁
        </h2>
        <p style={{ color: theme.gray, marginBottom: '1.5rem' }}>
          Zero upfront cost. Choose your kit and get your free starter cylinder with real LPG delivered.
        </p>

        {/* Kit Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontWeight: '700', marginBottom: '1rem', color: theme.dark }}>Select Your Kit</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: screenSize.isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1rem'
            }}
          >
            {kitOptions.map((kit) => (
              <div
                key={kit.id}
                onClick={() => {
                  setSelectedKit(kit.id);
                  setFormData(prev => ({ ...prev, kitId: kit.id }));
                }}
                style={{
                  border: `2px solid ${selectedKit === kit.id ? theme.primary : '#ddd'}`,
                  borderRadius: '12px',
                  padding: '1rem',
                  cursor: 'pointer',
                  backgroundColor: selectedKit === kit.id ? `${theme.primary}10` : 'white',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{kit.icon}</div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: theme.dark }}>
                  {kit.fullName}
                </div>
                <div style={{ fontSize: '0.8rem', color: theme.gray, marginBottom: '0.5rem' }}>
                  {kit.size} • {kit.cooker}
                </div>
                <div style={{ fontSize: '0.85rem', color: theme.primary, fontWeight: '600' }}>
                  FREE + {kit.monthly}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: screenSize.isMobile ? '1fr' : '1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem'
            }}
          >
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: theme.dark }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `2px solid ${formErrors.name ? theme.danger : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border 0.3s ease'
                }}
                onFocus={(e) => (e.target.style.borderColor = theme.primary)}
                onBlur={(e) => (e.target.style.borderColor = formErrors.name ? theme.danger : '#ddd')}
              />
              {formErrors.name && <p style={{ color: theme.danger, fontSize: '0.8rem', marginTop: '0.3rem' }}>{formErrors.name}</p>}
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: theme.dark }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="0712345678"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `2px solid ${formErrors.phone ? theme.danger : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border 0.3s ease'
                }}
                onFocus={(e) => (e.target.style.borderColor = theme.primary)}
                onBlur={(e) => (e.target.style.borderColor = formErrors.phone ? theme.danger : '#ddd')}
              />
              {formErrors.phone && <p style={{ color: theme.danger, fontSize: '0.8rem', marginTop: '0.3rem' }}>{formErrors.phone}</p>}
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: theme.dark }}>
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: theme.dark }}>
                Delivery Location *
              </label>
              <input
                type="text"
                name="location"
                placeholder="Nairobi, Kenya"
                value={formData.location}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `2px solid ${formErrors.location ? theme.danger : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border 0.3s ease'
                }}
                onFocus={(e) => (e.target.style.borderColor = theme.primary)}
                onBlur={(e) => (e.target.style.borderColor = formErrors.location ? theme.danger : '#ddd')}
              />
              {formErrors.location && <p style={{ color: theme.danger, fontSize: '0.8rem', marginTop: '0.3rem' }}>{formErrors.location}</p>}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: theme.dark }}>
              Special Instructions (e.g., gate code, landmark)
            </label>
            <textarea
              name="instructions"
              placeholder="Any special instructions for delivery..."
              value={formData.instructions}
              onChange={handleInputChange}
              rows="3"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowSignUpModal(false)}
              style={{
                background: '#f0f0f0',
                color: theme.dark,
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target.style.background = '#e0e0e0')}
              onMouseLeave={(e) => (e.target.style.background = '#f0f0f0')}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: theme.primary,
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                fontWeight: '700',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => !isSubmitting && (e.target.style.opacity = '0.9')}
              onMouseLeave={(e) => !isSubmitting && (e.target.style.opacity = '1')}
            >
              {isSubmitting ? 'Processing...' : 'Get Free Kit →'}
            </button>
          </div>
        </form>

        <p style={{ fontSize: '0.85rem', color: theme.gray, marginTop: '1rem', textAlign: 'center' }}>
          By signing up, you agree to our Terms & Conditions and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
