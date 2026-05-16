import React, { useState } from 'react';
import { API_URL } from '../config';

const PaymentModal = ({
  showPaymentModal,
  setShowPaymentModal,
  screenSize,
  theme,
  showMessage,
  setBalance
}) => {
  const [activePaymentTab, setActivePaymentTab] = useState('mpesa');
  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: '',
    amount: 100
  });
  const [checkoutRequestID, setCheckoutRequestID] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [pollAttempts, setPollAttempts] = useState(0);

  if (!showPaymentModal) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleMpesaPayment = async () => {
    if (!paymentDetails.phoneNumber) {
      showMessage('Please enter your M-PESA phone number', 'error');
      return;
    }

    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    if (!phoneRegex.test(paymentDetails.phoneNumber)) {
      showMessage('Enter a valid Kenyan phone number (e.g., 0712345678)', 'error');
      return;
    }

    setProcessingPayment(true);
    showMessage('Sending STK Push to your phone...', 'info');

    try {
      const response = await fetch(`${API_URL}/api/mpesa/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: paymentDetails.phoneNumber,
          amount: paymentDetails.amount,
          accountReference: 'OKOA GAS',
          description: `Top-up KES ${paymentDetails.amount}`
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to initiate payment.');
      }

      setCheckoutRequestID(data.checkoutRequestID);
      setPaymentStatus({ status: 'pending' });
      setStatusMessage('Waiting for M-PESA confirmation...');
      setPollAttempts(0);
      showMessage(data.message || 'STK Push sent. Complete payment on your phone.', 'success');

      setTimeout(() => {
        pollPaymentStatus(data.checkoutRequestID);
      }, 8000);
    } catch (error) {
      showMessage(error.message || 'Payment failed. Please try again.', 'error');
    } finally {
      setProcessingPayment(false);
    }
  };

  const pollPaymentStatus = async (checkoutId, attempt = 1) => {
    if (attempt > 4) {
      setStatusMessage('Still waiting for confirmation. If the STK push did not arrive, try again.');
      return;
    }
    setPollAttempts(attempt);
    if (!checkoutId) return;

    try {
      const statusResponse = await fetch(`${API_URL}/api/mpesa/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkoutRequestID: checkoutId })
      });

      const statusData = await statusResponse.json();
      setPaymentStatus(statusData);

      const requestSuccess = statusData.ResultCode === 0 || statusData.resultCode === 0;
      const requestFailure = statusData.ResultCode === 1 || statusData.resultCode === '1' || statusData.resultCode === 1;

      if (requestSuccess) {
        setStatusMessage('Payment confirmed successfully.');
        showMessage(`Payment confirmed! KES ${paymentDetails.amount} has been added.`, 'success');
        setBalance((prev) => Number((prev + paymentDetails.amount).toFixed(2)));
        setShowPaymentModal(false);
        setPaymentDetails({ phoneNumber: '', amount: 100 });
        return;
      }

      if (requestFailure) {
        const failureText = statusData.error || statusData.ResultDesc || 'Payment failed or was cancelled.';
        setStatusMessage(failureText);
        showMessage(failureText, 'warning');
        return;
      }

      const nextMessage = statusData.ResultDesc || statusData.error || 'Waiting for M-PESA confirmation...';
      setStatusMessage(nextMessage);
      setTimeout(() => pollPaymentStatus(checkoutId, attempt + 1), 5000);
    } catch (error) {
      setStatusMessage('Unable to verify payment status right now. Retrying...');
      if (attempt < 4) {
        setTimeout(() => pollPaymentStatus(checkoutId, attempt + 1), 5000);
      }
      showMessage('Unable to verify payment status. Please check your phone.', 'warning');
    }
  };

  const PaymentTab = ({ id, label, icon }) => (
    <button
      onClick={() => setActivePaymentTab(id)}
      style={{
        flex: 1,
        background: activePaymentTab === id ? theme.primary : '#f0f0f0',
        color: activePaymentTab === id ? 'white' : theme.gray,
        border: 'none',
        padding: '0.75rem',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}
      onMouseEnter={(e) => {
        if (activePaymentTab !== id) {
          e.target.style.background = '#e8e8e8';
        }
      }}
      onMouseLeave={(e) => {
        if (activePaymentTab !== id) {
          e.target.style.background = '#f0f0f0';
        }
      }}
    >
      <span style={{ fontSize: '1.1rem' }}>{icon}</span>
      <span style={{ fontSize: screenSize.isMobile ? '0.8rem' : '0.95rem' }}>{label}</span>
    </button>
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={() => setShowPaymentModal(false)}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          maxWidth: '500px',
          width: '100%',
          padding: '1.5rem',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowPaymentModal(false)}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: theme.gray
          }}
        >
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💰</div>
          <h2 style={{ fontSize: '1.5rem', color: theme.dark, marginBottom: '0.25rem' }}>Top Up Your Balance</h2>
          <p style={{ color: theme.gray, fontSize: '0.95rem' }}>Multiple payment methods available</p>
        </div>

        {/* Payment Method Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}
        >
          <PaymentTab id="mpesa" label="M-PESA" icon="📱" />
          <PaymentTab id="ussd" label="USSD" icon="☎️" />
          <PaymentTab id="contact" label="Text/Call" icon="💬" />
        </div>

        {/* M-PESA Tab Content */}
        {activePaymentTab === 'mpesa' && (
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.dark }}>
                Amount (KES)
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {[100, 200, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setPaymentDetails(prev => ({ ...prev, amount: amt }))}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: paymentDetails.amount === amt ? theme.primary : '#f0f0f0',
                      color: paymentDetails.amount === amt ? 'white' : '#333',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    KES {amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={paymentDetails.amount}
                onChange={(e) =>
                  setPaymentDetails(prev => ({
                    ...prev,
                    amount: parseInt(e.target.value) || 0
                  }))
                }
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: theme.dark }}>
                M-PESA Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="0712345678"
                value={paymentDetails.phoneNumber}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
              <p style={{ fontSize: '0.8rem', color: theme.gray, marginTop: '0.5rem' }}>
                Enter the number registered on M-PESA
              </p>
            </div>

            <button
              onClick={handleMpesaPayment}
              disabled={processingPayment}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: theme.primary,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: processingPayment ? 'not-allowed' : 'pointer',
                opacity: processingPayment ? 0.7 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {processingPayment ? 'Sending STK Push...' : `Pay KES ${paymentDetails.amount} with M-PESA →`}
            </button>

            {checkoutRequestID && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: '#eef2ff',
                  borderRadius: '12px',
                  border: `1px solid ${theme.primary}33`,
                  color: theme.dark
                }}
              >
                <p style={{ margin: 0, fontWeight: '700' }}>Payment status</p>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.95rem' }}>
                  {statusMessage || paymentStatus?.ResultDesc || paymentStatus?.error || 'Waiting for confirmation from M-PESA...'}
                </p>
                {pollAttempts > 0 && (
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: theme.gray }}>
                    Attempt {pollAttempts} of 4
                  </p>
                )}
              </div>
            )}

            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                background: '#f0fdf4',
                borderRadius: '8px',
                borderLeft: `4px solid #10b981`
              }}
            >
              <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>
                <strong>How it works:</strong> You'll receive an STK Push on your M-PESA registered phone. Enter your PIN to complete the payment. Balance updates instantly!
              </p>
            </div>
          </div>
        )}

        {/* USSD Tab Content */}
        {activePaymentTab === 'ussd' && (
          <div>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☎️</div>
              <h3 style={{ color: theme.dark, fontWeight: '700', marginBottom: '1rem' }}>Quick USSD Code</h3>
              <div
                style={{
                  background: theme.primary,
                  color: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  marginBottom: '1.5rem'
                }}
              >
                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Dial on your phone:</p>
                <p style={{ fontSize: '2rem', fontWeight: '900', fontFamily: 'monospace' }}>*483#</p>
              </div>
              <p style={{ color: theme.gray, marginBottom: '1rem' }}>
                Then follow the prompts to:
              </p>
              <ul style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto', lineHeight: '2' }}>
                <li>Check your balance</li>
                <li>Top up credit</li>
                <li>Manage your account</li>
              </ul>
            </div>
          </div>
        )}

        {/* Contact Tab Content */}
        {activePaymentTab === 'contact' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div
                style={{
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: `2px solid ${theme.primary}20`
                }}
              >
                <h3 style={{ color: theme.primary, fontWeight: '700', marginBottom: '0.5rem' }}>📱 SMS</h3>
                <p style={{ color: theme.gray, margin: 0 }}>
                  Text <strong>"Hi"</strong> to<br />
                  <span style={{ fontFamily: 'monospace', fontWeight: '700' }}>+254717052939</span><br />
                  to check balance or request top-up
                </p>
              </div>

              <div
                style={{
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: `2px solid ${theme.primary}20`
                }}
              >
                <h3 style={{ color: theme.primary, fontWeight: '700', marginBottom: '0.5rem' }}>📞 Call</h3>
                <p style={{ color: theme.gray, margin: 0 }}>
                  Call us directly at<br />
                  <span style={{ fontFamily: 'monospace', fontWeight: '700' }}>+254717052939</span><br />
                  Available 24/7
                </p>
              </div>

              <div
                style={{
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '12px',
                  border: `2px solid ${theme.primary}20`
                }}
              >
                <h3 style={{ color: theme.primary, fontWeight: '700', marginBottom: '0.5rem' }}>🏦 Paybill</h3>
                <p style={{ color: theme.gray, margin: 0 }}>
                  <strong>Paybill Number:</strong> 123456<br />
                  <strong>Account:</strong> Your Phone Number<br />
                  Coming soon!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
