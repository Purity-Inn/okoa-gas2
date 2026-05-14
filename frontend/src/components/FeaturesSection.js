import React, { useEffect, useRef, useState } from 'react';

const FeaturesSection = ({ screenSize, theme }) => {
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

  const features = [
    {
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80',
      title: 'Free Starter Cylinder',
      description: 'Choose between 6kg or 13kg. Free starter cylinder with real gas included and zero upfront cost.'
    },
    {
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&q=80',
      title: 'Included Cooker',
      description: 'High-quality 2-3 burner cooker comes with registration. No deposit needed.'
    },
    {
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop&q=80',
      title: 'Smart IoT Meter',
      description: 'Real-time tracking. Pay only for what you use via M-PESA instantly.'
    }
  ];

  return (
    <div
      ref={sectionRef}
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
          fontWeight: '800',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out'
        }}
      >
        The "Zero Upfront" Promise
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
              transition: 'all 0.5s ease',
              cursor: 'pointer',
              overflow: 'hidden',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              animationDelay: `${idx * 0.2}s`,
              animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
              e.currentTarget.style.borderColor = theme.primary;
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
                  transition: 'transform 0.6s ease',
                  opacity: 0,
                  animation: isVisible ? `fadeIn 0.6s ease-out ${0.4 + idx * 0.2}s forwards` : 'none'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>

            <div style={{ padding: '1.5rem' }}>
              <h3
                style={{
                  color: theme.primary,
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.6s ease-out',
                  animationDelay: `${0.5 + idx * 0.2}s`,
                  animation: isVisible ? `fadeInUp 0.6s ease-out forwards` : 'none'
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  color: theme.gray,
                  lineHeight: '1.6',
                  fontSize: '0.95rem',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.6s ease-out',
                  animationDelay: `${0.6 + idx * 0.2}s`,
                  animation: isVisible ? `fadeInUp 0.6s ease-out forwards` : 'none'
                }}
              >
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