import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import SmartMeterSection from './components/SmartMeterSection';
import CarbonSavingsSection from './components/CarbonSavingsSection';
import SafetySection from './components/SafetySection';
import ContactSection from './components/ContactSection';
import PaymentModal from './components/PaymentModal';
import SignUpModal from './components/SignUpModal';
import Footer from './components/Footer';

const App = () => {
  // --- State ---
  const [currentTab, setCurrentTab] = useState('home');
  const [showNotification, setShowNotification] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [balance, setBalance] = useState(75.5);
  const [screenSize, setScreenSize] = useState({
    isMobile: window.innerWidth < 768,
    width: window.innerWidth
  });

  // --- Theme ---
  const theme = {
    primary: '#16a34a',
    primaryDark: '#15803d',
    secondary: '#4CAF50',
    accent: '#3b82f6',
    dark: '#111827',
    light: '#f9fafb',
    gray: '#4b5563',
    danger: '#dc2626'
  };

  // --- Screen Resize Handler ---
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 768,
        width: window.innerWidth
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Show Message Helper ---
  const showMessage = (msg, type = 'success') => {
    setShowNotification({ message: msg, type });
    setTimeout(() => setShowNotification(null), 3000);
  };

  // --- Button Component ---
  const Button = ({ children, onClick, primary = true, small = false }) => (
    <button
      onClick={onClick}
      style={{
        backgroundColor: primary ? theme.primary : 'white',
        color: primary ? 'white' : theme.primary,
        border: primary ? 'none' : `2px solid ${theme.primary}`,
        padding: small ? '0.5rem 1rem' : screenSize.isMobile ? '0.6rem 1.2rem' : '0.75rem 1.5rem',
        borderRadius: '50px',
        fontWeight: '600',
        fontSize: small ? '0.85rem' : screenSize.isMobile ? '0.9rem' : '1rem',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
    >
      {children}
    </button>
  );

  // --- Render Tab Content ---
  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HeroSection
            setShowSignUpModal={setShowSignUpModal}
            setShowPaymentModal={setShowPaymentModal}
            screenSize={screenSize}
            theme={theme}
            Button={Button}
          />
        );
      case 'features':
        return <FeaturesSection screenSize={screenSize} theme={theme} />;
      case 'meter':
        return (
          <SmartMeterSection
            screenSize={screenSize}
            theme={theme}
            setShowPaymentModal={setShowPaymentModal}
              balance={balance}
          />
        );
      case 'carbon':
        return <CarbonSavingsSection screenSize={screenSize} theme={theme} />;
      case 'safety':
        return <SafetySection screenSize={screenSize} theme={theme} />;
      case 'contact':
        return (
          <ContactSection
            screenSize={screenSize}
            theme={theme}
            showMessage={showMessage}
          />
        );
      default:
        return (
          <HeroSection
            setShowSignUpModal={setShowSignUpModal}
            setShowPaymentModal={setShowPaymentModal}
            screenSize={screenSize}
            theme={theme}
            Button={Button}
          />
        );
    }
  };

  // --- Main Render ---
  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: theme.light,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background-color: ${theme.light};
          }
        `}
      </style>

      {/* Notification */}
      {showNotification && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: screenSize.isMobile ? '10px' : '20px',
            left: screenSize.isMobile ? '10px' : 'auto',
            backgroundColor:
              showNotification.type === 'error'
                ? theme.danger
                : showNotification.type === 'warning'
                ? theme.accent
                : theme.primary,
            color: 'white',
            padding: '1rem',
            borderRadius: '12px',
            zIndex: 1001,
            animation: 'slideIn 0.3s ease',
            textAlign: 'center',
            maxWidth: screenSize.isMobile ? 'auto' : '400px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            fontWeight: '500'
          }}
        >
          {showNotification.message}
        </div>
      )}

      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        screenSize={screenSize}
        theme={theme}
        setShowSignUpModal={setShowSignUpModal}
        Button={Button}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>{renderTabContent()}</main>

      {/* Modals */}
      <PaymentModal
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        screenSize={screenSize}
        theme={theme}
        showMessage={showMessage}
          setBalance={setBalance}
      />

      <SignUpModal
        showSignUpModal={showSignUpModal}
        setShowSignUpModal={setShowSignUpModal}
        screenSize={screenSize}
        theme={theme}
        showMessage={showMessage}
      />

      {/* Footer */}
      <Footer theme={theme} screenSize={screenSize} />
    </div>
  );
};

export default App;
