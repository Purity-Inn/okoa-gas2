import React from 'react';

const HeroSection = ({ setShowSignUpModal, setShowPaymentModal, screenSize, theme, Button }) => {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
        color: 'white',
        padding: screenSize.isMobile ? '3rem 1rem' : '5rem 2rem',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1
        style={{
          fontSize: screenSize.isMobile ? '2.2rem' : '3.5rem',
          fontWeight: '900',
          marginBottom: '1rem',
          letterSpacing: '-1px'
        }}
      >
        Clean Cooking for Every Home
      </h1>
      <p
        style={{
          fontSize: screenSize.isMobile ? '1.3rem' : '1.8rem',
          fontWeight: '300',
          marginBottom: '1.5rem',
          opacity: 0.95
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
          lineHeight: '1.6'
        }}
      >
        Free starter cylinder with real LPG included. No deposit, delivered to your stove so you can pay as you cook.
      </p>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
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
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'translateY(-3px)')}
          onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
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
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => (e.target.style.background = 'rgba(255,255,255,0.3)')}
          onMouseLeave={(e) => (e.target.style.background = 'rgba(255,255,255,0.2)')}
        >
          Top Up Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
