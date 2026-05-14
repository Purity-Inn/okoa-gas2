import React from 'react';

const Footer = ({ theme, screenSize }) => {
  return (
    <footer
      style={{
        background: theme.dark,
        color: '#94a3b8',
        padding: screenSize.isMobile ? '2rem 1rem' : '3rem 2rem',
        borderTop: `3px solid ${theme.primary}`
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Footer Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: screenSize.isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '2rem',
            marginBottom: '2rem'
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🔥</span>
              <span style={{ fontWeight: '800', fontSize: '1.1rem', color: 'white' }}>OKOA GAS</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              Clean cooking for every home. Pay as you go from KES 1.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
              <li>
                <a href="#home" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => (e.target.style.color = theme.primary)}
                   onMouseLeave={(e) => (e.target.style.color = '#94a3b8')}>
                  Home
                </a>
              </li>
              <li>
                <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => (e.target.style.color = theme.primary)}
                   onMouseLeave={(e) => (e.target.style.color = '#94a3b8')}>
                  Features
                </a>
              </li>
              <li>
                <a href="#safety" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => (e.target.style.color = theme.primary)}
                   onMouseLeave={(e) => (e.target.style.color = '#94a3b8')}>
                  Safety
                </a>
              </li>
              <li>
                <a href="#contact" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => (e.target.style.color = theme.primary)}
                   onMouseLeave={(e) => (e.target.style.color = '#94a3b8')}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '1rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
              <li>
                <a href="#terms" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => (e.target.style.color = theme.primary)}
                   onMouseLeave={(e) => (e.target.style.color = '#94a3b8')}>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#privacy" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => (e.target.style.color = theme.primary)}
                   onMouseLeave={(e) => (e.target.style.color = '#94a3b8')}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#cookies" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.3s' }}
                   onMouseEnter={(e) => (e.target.style.color = theme.primary)}
                   onMouseLeave={(e) => (e.target.style.color = '#94a3b8')}>
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', marginBottom: '1rem' }}>Contact</h4>
            <div style={{ lineHeight: '1.8' }}>
              <p style={{ margin: '0.5rem 0' }}>
                <a href="tel:+254717052939" style={{ color: theme.primary, textDecoration: 'none', fontWeight: '600' }}>
                  📞 +254 717 052 939
                </a>
              </p>
              <p style={{ margin: '0.5rem 0' }}>
                <a href="mailto:okoagas.energy@gmail.com" style={{ color: theme.primary, textDecoration: 'none', fontWeight: '600' }}>
                  📧 okoagas.energy@gmail.com
                </a>
              </p>
              <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                Available 24/7 for emergencies
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)', paddingTop: '2rem', marginBottom: '1rem' }}>
          {/* Social Links */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent: 'center' }}>
            <a href="#contact" style={{ fontSize: '1.3rem', textDecoration: 'none', color: '#94a3b8' }}>📱</a>
            <a href="#contact" style={{ fontSize: '1.3rem', textDecoration: 'none', color: '#94a3b8' }}>📘</a>
            <a href="#contact" style={{ fontSize: '1.3rem', textDecoration: 'none', color: '#94a3b8' }}>🐦</a>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ textAlign: 'center', fontSize: '0.85rem' }}>
          <p style={{ margin: '0.5rem 0' }}>
            © {new Date().getFullYear()} OKOA GAS Kenya. All rights reserved.
          </p>
          <p style={{ margin: '0.5rem 0', opacity: 0.7 }}>
            Revolutionizing clean cooking in Kenya | Sustainable Energy Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
