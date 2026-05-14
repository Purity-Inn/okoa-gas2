import React from 'react';

const SafetySection = ({ screenSize, theme }) => {
  const safetyFeatures = [
    {
      icon: '🔍',
      title: 'Automatic Leak Detection',
      description: 'Equipped with high-precision sensors, the meter continuously monitors the surrounding air. If the slightest LPG leak is detected, an instant alert is triggered.'
    },
    {
      icon: '🚨',
      title: 'Emergency Valve Shutoff',
      description: 'In the event of a detected leak, the meter immediately and mechanically shuts off the gas supply. Locked until reset by authorized technician.'
    },
    {
      icon: '📱',
      title: 'Real-time Alerts',
      description: 'Get instant notifications on your phone about any safety issues. 24/7 monitoring ensures your home is always protected.'
    },
    {
      icon: '🛡️',
      title: 'Safety Certifications',
      description: 'Our smart meters meet international safety standards. Fully certified and tested for reliability and durability.'
    }
  ];

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${theme.dark} 0%, ${theme.primaryDark} 100%)`,
        padding: screenSize.isMobile ? '3rem 1rem' : '4rem 2rem',
        color: 'white'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: screenSize.isMobile ? '2rem' : '2.5rem',
            marginBottom: '0.5rem',
            fontWeight: '800'
          }}
        >
          Safety First, Always
        </h2>
        <p
          style={{
            textAlign: 'center',
            fontSize: '1.05rem',
            marginBottom: '2.5rem',
            opacity: 0.9
          }}
        >
          Our smart meters don't just track usage—they actively protect your home 24/7
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: screenSize.isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.5rem'
          }}
        >
          {safetyFeatures.map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: theme.secondary
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  opacity: 0.9
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <div
          style={{
            marginTop: '3rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            border: `2px solid ${theme.secondary}`
          }}
        >
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>
            🚨 Emergency? Contact Us Immediately
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Available 24/7 for safety concerns</p>
          <a
            href="tel:+254717052939"
            style={{
              display: 'inline-block',
              background: theme.secondary,
              color: theme.dark,
              padding: '1rem 2rem',
              borderRadius: '50px',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              marginRight: '1rem',
              marginBottom: '0.5rem'
            }}
            onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
          >
            📞 Call +254717052939
          </a>
          <a
            href="mailto:okoagas.energy@gmail.com"
            style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '50px',
              fontWeight: '700',
              textDecoration: 'none',
              border: '1px solid white',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.3)')}
            onMouseLeave={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.2)')}
          >
            📧 Email Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default SafetySection;
