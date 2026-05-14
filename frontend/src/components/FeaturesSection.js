import React from 'react';
const FeaturesSection = ({ screenSize, theme }) => {
  const features = [
    {
      img: 'https://placehold.co/500x300/2D3748/FFFFFF?text=Gas+Cylinder',
      title: 'Free Starter Cylinder',
      description: 'Choose between 6kg or 13kg. Free starter cylinder with real gas included and zero upfront cost.'
    },
    {
      img: 'https://placehold.co/500x300/4A5568/FFFFFF?text=Gas+Burner',
      title: 'Included Cooker',
      description: 'High-quality 2-3 burner cooker comes with registration. No deposit needed.'
    },
    {
      img: 'https://placehold.co/500x300/718096/FFFFFF?text=IoT+Meter',
      title: 'Smart IoT Meter',
      description: 'Real-time tracking. Pay only for what you use via M-PESA instantly.'
    }
  ];

  return (
    <div
      style={{
        background: 'white',
        padding: screenSize.isMobile ? '3rem 1rem' : '4rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
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
        The "Zero Upfront" Promise
      </h2>
      <p
        style={{
          textAlign: 'center',
          color: theme.gray,
          marginBottom: '2.5rem',
          fontSize: '1.05rem'
        }}
      >
        Everything you need to start cooking clean today
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: screenSize.isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '2rem'
        }}
      >
        {features.map((feature, idx) => (
          <div
            key={idx}
            style={{
              background: '#f8f9fa',
              borderRadius: '16px',
              textAlign: 'center',
              border: `2px solid ${theme.primary}20`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                width: '100%',
                height: '220px',
                overflow: 'hidden',
                borderRadius: '14px 14px 0 0',
                backgroundColor: '#e9ecef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={feature.img}
                alt={feature.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>

            <div style={{ padding: '1.5rem' }}>
              <h3
                style={{
                  color: theme.primary,
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem'
                }}
              >
                {feature.title}
              </h3>
              <p style={{ color: theme.gray, lineHeight: '1.6', fontSize: '0.95rem' }}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;