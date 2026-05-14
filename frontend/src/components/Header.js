import React from 'react';

const Header = ({ currentTab, setCurrentTab, screenSize, theme, setShowSignUpModal, Button }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'meter', label: 'Smart Meter' },
    { id: 'carbon', label: 'Carbon Savings' },
    { id: 'safety', label: 'Safety' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      style={{
        background: 'white',
        padding: screenSize.isMobile ? '0.75rem 1rem' : '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderBottom: `3px solid ${theme.primary}`
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: screenSize.isMobile ? 'wrap' : 'nowrap',
          gap: '1rem'
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            minWidth: 'fit-content'
          }}
          onClick={() => setCurrentTab('home')}
        >
          <span style={{ fontSize: screenSize.isMobile ? '1.8rem' : '2.2rem' }}>🔥</span>
          <span
            style={{
              fontWeight: '800',
              fontSize: screenSize.isMobile ? '1.1rem' : '1.4rem',
              color: theme.dark,
              letterSpacing: '-0.5px'
            }}
          >
            OKOA GAS
          </span>
        </div>

        {/* Navigation Tabs */}
        {!screenSize.isMobile && (
          <div
            style={{
              display: 'flex',
              gap: '0',
              flex: 1,
              justifyContent: 'center'
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.75rem 1.2rem',
                  fontSize: '0.95rem',
                  fontWeight: currentTab === tab.id ? '700' : '500',
                  cursor: 'pointer',
                  color: currentTab === tab.id ? theme.primary : theme.gray,
                  borderBottom: currentTab === tab.id ? `3px solid ${theme.primary}` : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
            minWidth: 'fit-content'
          }}
        >
          <Button onClick={() => setShowSignUpModal(true)} small>
            Free Kit
          </Button>
        </div>
      </div>

      {/* Mobile Tab Selector */}
      {screenSize.isMobile && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            overflowX: 'auto',
            gap: '0.5rem',
            marginTop: '0.75rem',
            paddingBottom: '0.5rem',
            scrollBehavior: 'smooth'
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              style={{
                background: currentTab === tab.id ? theme.primary : '#f0f0f0',
                color: currentTab === tab.id ? 'white' : theme.gray,
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
