import React, { useEffect, useRef, useState } from 'react';

const SafetySection = ({ screenSize, theme }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      ref={sectionRef}
      style={{
        background: `linear-gradient(135deg, ${theme.dark} 0%, ${theme.primaryDark} 100%)`,
        padding: screenSize.isMobile ? '3rem 1rem' : '4rem 2rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          opacity: isVisible ? 1 : 0,
          animation: isVisible ? 'float 8s ease-in-out infinite' : 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '8%',
          width: '150px',
          height: '150px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '50%',
          opacity: isVisible ? 1 : 0,
          animation: isVisible ? 'float 6s ease-in-out infinite' : 'none',
          animationDelay: '2s'
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: screenSize.isMobile ? '2rem' : '2.5rem',
            marginBottom: '0.5rem',
            fontWeight: '800',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          Safety First, Always
        </h2>
        <p
          style={{
            textAlign: 'center',
            fontSize: '1.05rem',
            marginBottom: '2.5rem',
            opacity: 0.9,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.2s'
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
                transition: 'all 0.4s ease',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                animation: isVisible ? `fadeInUp 0.6s ease-out ${0.3 + idx * 0.15}s forwards` : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
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
            border: `2px solid ${theme.secondary}`,
            backdropFilter: 'blur(10px)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease-out 0.8s'
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
              transition: 'all 0.4s ease',
              marginRight: '1rem',
              marginBottom: '0.5rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
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
              transition: 'all 0.4s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            📧 Email Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default SafetySection;
