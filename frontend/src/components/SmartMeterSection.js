import React, { useState, useEffect, useRef } from 'react';

const SmartMeterSection = ({ screenSize, theme, setShowPaymentModal, balance }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const gasLevel = 85;
  const [meterStatus, setMeterStatus] = useState('Connected');

  const toggleValve = () => {
    setMeterStatus(meterStatus === 'Connected' ? 'Closed' : 'Connected');
  };

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
        Monitor & Control from Anywhere
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
        Smart IoT Meter gives you total control. See your live gas level, top up your balance instantly via M-PESA, and monitor valve status directly from your phone.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: screenSize.isMobile ? '1fr' : '1fr 1fr',
          gap: '2rem',
          alignItems: 'center'
        }}
      >
        {/* Left side - Info */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
            transition: 'all 0.8s ease-out 0.4s'
          }}
        >
          <div
            style={{
              padding: '2rem',
              background: 'white',
              borderRadius: '16px',
              border: `2px solid ${theme.primary}20`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}
          >
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: theme.dark,
                marginBottom: '1.5rem'
              }}
            >
              Real-time Tracking
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                '📊 Real-time daily usage updates',
                '⚡ Instant M-PESA balance reflection',
                '🔔 Smart alerts for low balance'
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s ease-out ${0.5 + i * 0.1}s`
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{item.split(' ')[0]}</span>
                  <span style={{ color: theme.gray }}>{item.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowPaymentModal(true)}
              style={{
                width: '100%',
                marginTop: '1.5rem',
                background: theme.primary,
                color: 'white',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Top Up via M-PESA
            </button>
          </div>
        </div>

        {/* Right side - Meter Display */}
        <div
          style={{
            background: `linear-gradient(135deg, ${theme.dark} 0%, ${theme.primaryDark} 100%)`,
            borderRadius: '16px',
            padding: '2rem',
            color: 'white',
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 0.8s ease-out 0.4s',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>VALVE STATUS</div>
          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>CREDIT BALANCE</div>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                animation: 'pulse 2s ease-in-out infinite',
                animationDelay: isVisible ? '0.5s' : '0s'
              }}
            >
              KES {balance.toFixed(2)}
            </div>
          </div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.75rem' }}>GAS LEVEL</div>
            <div
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '0.75rem'
              }}
            >
              {gasLevel}%
            </div>
            <div
              style={{
                height: '12px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '6px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${gasLevel}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${theme.secondary}, ${theme.accent})`,
                  borderRadius: '6px',
                  transition: 'width 0.5s ease-out'
                }}
              />
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>CREDIT BALANCE</div>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 'bold'
              }}
            >
              KES {balance.toFixed(2)}
            </div>
          </div>

          <button
            onClick={toggleValve}
            style={{
              width: '100%',
              background: 'white',
              color: theme.dark,
              border: 'none',
              padding: '0.75rem',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer',
              marginBottom: '0.75rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Toggle Valve (Simulation)
          </button>

          <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            💡 This is a demo. Connect your device for real-time control.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartMeterSection;
