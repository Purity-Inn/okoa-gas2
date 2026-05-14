import React, { useEffect, useRef, useState } from 'react';

const HeroSection = ({ setShowSignUpModal, setShowPaymentModal, screenSize, theme, Button }) => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={heroRef}
      style={{
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
        color: 'white',
        padding: screenSize.isMobile ? '3rem 1rem' : '5rem 2rem',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background shapes */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          opacity: isVisible ? 1 : 0,
          animation: isVisible ? 'float 6s ease-in-out infinite' : 'none',
          animationDelay: '0s'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '50%',
          opacity: isVisible ? 1 : 0,
          animation: isVisible ? 'float 7s ease-in-out infinite' : 'none',
          animationDelay: '1s'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          right: '15%',
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          opacity: isVisible ? 1 : 0,
          animation: isVisible ? 'float 5s ease-in-out infinite' : 'none',
          animationDelay: '0.5s'
        }}
      />

      <h1
        style={{
          fontSize: screenSize.isMobile ? '2.2rem' : '3.5rem',
          fontWeight: '900',
          marginBottom: '1rem',
          letterSpacing: '-1px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          animation: isVisible ? 'fadeInUp 1s ease-out forwards' : 'none',
          animationDelay: '0.2s',
          position: 'relative',
          zIndex: 1
        }}
      >
        Clean Cooking for Every Home
      </h1>
      <p
        style={{
          fontSize: screenSize.isMobile ? '1.3rem' : '1.8rem',
          fontWeight: '300',
          marginBottom: '1.5rem',
          opacity: 0.95,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out',
          animation: isVisible ? 'fadeInUp 1s ease-out forwards' : 'none',
          animationDelay: '0.4s',
          position: 'relative',
          zIndex: 1
        }}
      >
        Pay as you go from KES 1
      </p>
      <p
        style={{
          maxWidth: '600px',
          fontSize: screenSize.isMobile ? '1rem' : '1.1rem',
          marginBottom: '2rem',
          opacity: 0.85,
          lineHeight: '1.6',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out',
          animation: isVisible ? 'fadeInUp 1s ease-out forwards' : 'none',
          animationDelay: '0.6s',
          position: 'relative',
          zIndex: 1
        }}
      >
        Free starter cylinder with real LPG included. No deposit, delivered to your stove so you can pay as you cook.
      </p>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out',
          animation: isVisible ? 'fadeInUp 1s ease-out forwards' : 'none',
          animationDelay: '0.8s',
          position: 'relative',
          zIndex: 1
        }}
      >
        <button
          onClick={() => setShowSignUpModal(true)}
          style={{
            background: 'white',
            color: theme.primary,
            border: 'none',
            padding: screenSize.isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
            fontSize: screenSize.isMobile ? '1rem' : '1.1rem',
            borderRadius: '50px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            animation: isVisible ? 'pulse 2s ease-in-out infinite' : 'none',
            animationDelay: '1.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
          }}
        >
          Get Your Free Kit →
        </button>
        <button
          onClick={() => setShowPaymentModal(true)}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid white',
            padding: screenSize.isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
            fontSize: screenSize.isMobile ? '1rem' : '1.1rem',
            borderRadius: '50px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            backdropFilter: 'blur(10px)',
            animation: isVisible ? 'pulse 2s ease-in-out infinite' : 'none',
            animationDelay: '1.4s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.35)';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Top Up Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
