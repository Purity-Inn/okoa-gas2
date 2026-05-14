import React, { useState, useEffect, useRef } from 'react';

const CarbonSavingsSection = ({ screenSize, theme }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [meals, setMeals] = useState(2);
  const [household, setHousehold] = useState(4);

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

  // Calculations based on realistic data
  const charcoalCostPerMeal = 200; // KES per meal
  const gasCostPerMeal = 50; // KES per meal (estimated)
  const mealsPerMonth = meals * 30;
  const monthlySavings = (charcoalCostPerMeal - gasCostPerMeal) * mealsPerMonth;
  const co2PerMeal = 2.4; // kg CO2
  const totalCo2Prevented = co2PerMeal * mealsPerMonth;
  const treesEquivalent = Math.round(totalCo2Prevented / 20); // 1 tree absorbs ~20kg CO2/year

  return (
    <div
      ref={sectionRef}
      style={{
        background: 'white',
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
        Carbon Savings Calculator
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
        See how much you save moving from charcoal to clean LPG
      </p>

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        {/* Input Controls */}
        <div
          style={{
            background: '#f8f9fa',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease-out 0.4s',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: screenSize.isMobile ? '1fr' : '1fr 1fr',
              gap: '2rem',
              marginBottom: '2rem'
            }}
          >
            {/* Meals Input */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.6s ease-out 0.5s'
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: theme.dark,
                  fontSize: '0.95rem'
                }}
              >
                Meals Cooked Per Day: <span style={{ color: theme.primary }}>{meals}</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={meals}
                onChange={(e) => setMeals(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  background: `linear-gradient(to right, ${theme.primary} 0%, ${theme.primary} ${(meals - 1) * 11.1}%, #e9ecef ${(meals - 1) * 11.1}%, #e9ecef 100%)`,
                  outline: 'none',
                  cursor: 'pointer',
                  WebkitAppearance: 'none',
                  appearance: 'none'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: theme.gray }}>
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            {/* Household Size Input */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.6s ease-out 0.6s'
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: theme.dark,
                  fontSize: '0.95rem'
                }}
              >
                Household Size: <span style={{ color: theme.primary }}>{household}</span> people
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={household}
                onChange={(e) => setHousehold(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  background: `linear-gradient(to right, ${theme.primary} 0%, ${theme.primary} ${(household - 1) * 5.26}%, #e9ecef ${(household - 1) * 5.26}%, #e9ecef 100%)`,
                  outline: 'none',
                  cursor: 'pointer',
                  WebkitAppearance: 'none',
                  appearance: 'none'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: theme.gray }}>
                <span>1</span>
                <span>20</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: screenSize.isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.5rem'
          }}
        >
          {/* Savings Card */}
          <div
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
              borderRadius: '16px',
              padding: '2rem',
              color: 'white',
              textAlign: 'center',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s ease-out 0.7s',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>ESTIMATED MONTHLY SAVINGS</div>
            <div
              style={{
                fontSize: screenSize.isMobile ? '2rem' : '2.5rem',
                fontWeight: '900',
                marginBottom: '0.5rem'
              }}
            >
              KES {monthlySavings.toLocaleString()}
            </div>
            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>vs. charcoal cooking</p>
          </div>

          {/* CO2 Card */}
          <div
            style={{
              background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`,
              borderRadius: '16px',
              padding: '2rem',
              color: 'white',
              textAlign: 'center',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.8s ease-out 0.9s',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.5rem' }}>CO₂ PREVENTED PER MONTH</div>
            <div
              style={{
                fontSize: screenSize.isMobile ? '2rem' : '2.5rem',
                fontWeight: '900',
                marginBottom: '0.5rem'
              }}
            >
              {totalCo2Prevented.toFixed(1)} kg
            </div>
            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>✨ Equivalent to planting ~{treesEquivalent} trees</p>
          </div>
        </div>

        {/* Additional Info */}
        <div
          style={{
            background: '#f0fdf4',
            borderRadius: '16px',
            padding: '1.5rem',
            marginTop: '2rem',
            borderLeft: `4px solid #10b981`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 1.1s',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}
        >
          <h4 style={{ color: '#10b981', marginBottom: '0.75rem', fontWeight: '700' }}>💚 Environmental Impact</h4>
          <ul style={{ marginLeft: '1.5rem', color: theme.gray, lineHeight: '1.8' }}>
            <li>Switching from charcoal saves {totalCo2Prevented.toFixed(1)}kg CO₂ monthly</li>
            <li>This is equivalent to planting ~{treesEquivalent} trees</li>
            <li>Plus you save KES {monthlySavings.toLocaleString()} every month</li>
            <li>Clean air in your home - better health for your family</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarbonSavingsSection;
