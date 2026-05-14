import React, { useState } from 'react';

const SmartMeterSection = ({ screenSize, theme, setShowPaymentModal, balance }) => {
  const gasLevel = 85;
  const [meterStatus, setMeterStatus] = useState('Connected');

  const toggleValve = () => {
    setMeterStatus(meterStatus === 'Connected' ? 'Closed' : 'Connected');
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
        Monitor & Control from Anywhere
      </h2>
      <p
        style={{
          textAlign: 'center',
          color: theme.gray,
          marginBottom: '2.5rem',
          fontSize: '1.05rem'
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
        <div>
          <div
            style={{
              padding: '2rem',
              background: 'white',
              borderRadius: '16px',
              border: `2px solid ${theme.primary}20`
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📊</span>
                <span style={{ color: theme.gray }}>Real-time daily usage updates</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>⚡</span>
                <span style={{ color: theme.gray }}>Instant M-PESA balance reflection</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🔔</span>
                <span style={{ color: theme.gray }}>Smart alerts for low balance</span>
              </div>
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
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.target.style.opacity = '1')}
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
            textAlign: 'center'
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>VALVE STATUS</div>
            <div
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: meterStatus === 'Connected' ? theme.secondary : theme.danger
              }}
            >
              {meterStatus === 'Connected' ? '🟢 Connected/Open' : '🔴 Closed'}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem'
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
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem'
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
            onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
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
