import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [visible, setVisible] = useState(false);
  const [hoverHeading, setHoverHeading] = useState(false);
  const [hoverText, setHoverText] = useState(false);
  const [textPosition, setTextPosition] = useState(0);
  
  useEffect(() => {
    // Trigger animation after component mount
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);
    
    // Create text animation effect
    const animationInterval = setInterval(() => {
      setTextPosition(prev => (prev + 1) % 100);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(animationInterval);
    };
  }, []);
  
  // CSS styles with keyframes defined as an object
  const keyframes = {
    gradientMove: {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' }
    },
    float: {
      '0%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
      '100%': { transform: 'translateY(0px)' }
    },
    textShimmer: {
      '0%': { backgroundPosition: '-200% 50%' },
      '100%': { backgroundPosition: '200% 50%' }
    }
  };
  
  // Generate CSS animation string for keyframes
  const createCSSAnimation = (name, duration, timingFunction, delay = '0s', iteration = 'infinite', direction = 'alternate') => {
    return `${name} ${duration} ${timingFunction} ${delay} ${iteration} ${direction}`;
  };
  
  // CSS styles
  const styles = {
    dashboardContainer: {
      minHeight: '100vh',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    },
    header: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      padding: '20px 40px',
      display: 'flex',
      alignItems: 'center'
    },
    logo: {
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
      animation: 'float 3s ease-in-out infinite'
    },
    welcomeCard: {
      background: 'white',
      borderRadius: '24px',
      padding: '40px 50px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
      border: '1px solid #f3f4f6',
      maxWidth: '600px',
      width: '100%',
      textAlign: 'center',
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
      opacity: visible ? 1 : 0,
      transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1)'
    },
    welcomeHeading: {
      fontSize: '2.4rem',
      fontWeight: '700',
      margin: '0 0 16px 0',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
      backgroundImage: hoverHeading 
        ? 'linear-gradient(90deg, #FF5757, #8C52FF, #5CE1E6, #FFD166, #FF5757)'
        : 'linear-gradient(90deg, #111827, #2563EB, #111827)',
      backgroundSize: '200% auto',
      backgroundClip: 'text',
      textFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: createCSSAnimation('textShimmer', '3s', 'linear'),
      cursor: 'pointer'
    },
    welcomeText: {
      fontSize: '1.2rem',
      lineHeight: '1.6',
      margin: '0',
      opacity: visible ? 1 : 0,
      transform: `translateY(${textPosition % 10 === 0 ? '0' : textPosition % 5 === 0 ? '-5px' : '0'})`,
      transition: 'transform 0.5s ease-in-out, background-position 0.5s ease',
      backgroundImage: hoverText 
        ? 'linear-gradient(90deg, #FF5757, #8C52FF, #5CE1E6, #FFD166, #FF5757)'
        : 'linear-gradient(90deg, #6b7280, #8b5cf6, #6b7280)',
      backgroundSize: '200% auto',
      backgroundClip: 'text',
      textFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: createCSSAnimation('textShimmer', '5s', 'linear'),
      cursor: 'pointer'
    },
    iconContainer: {
      marginBottom: '20px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) rotate(0)' : 'translateY(15px) rotate(-10deg)',
      transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s',
      animation: 'float 3s ease-in-out infinite'
    },
    icon: {
      fontSize: '3.5rem'
    },
    decorationBox: {
      position: 'absolute',
      borderRadius: '24px',
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      transform: 'rotate(-15deg)',
      zIndex: '0',
      animation: 'gradientMove 15s ease infinite'
    },
    decorationBox1: {
      width: '300px',
      height: '300px',
      top: '-50px',
      right: '-100px',
      background: 'linear-gradient(135deg, rgba(255, 87, 87, 0.07), rgba(140, 82, 255, 0.07), rgba(92, 225, 230, 0.07))',
      backgroundSize: '300% 300%',
      animation: 'gradientMove 15s ease infinite'
    },
    decorationBox2: {
      width: '200px',
      height: '200px',
      bottom: '100px',
      left: '-50px',
      background: 'linear-gradient(135deg, rgba(140, 82, 255, 0.05), rgba(92, 225, 230, 0.05), rgba(255, 209, 102, 0.05))',
      backgroundSize: '300% 300%',
      animation: 'gradientMove 10s ease infinite reverse'
    },
    decorationCircle: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(255, 87, 87, 0.08), rgba(92, 225, 230, 0.08), rgba(255, 209, 102, 0.08))',
      backgroundSize: '300% 300%',
      width: '150px',
      height: '150px',
      bottom: '-50px',
      right: '15%',
      animation: 'gradientMove 12s ease infinite'
    },
    '@keyframes gradientMove': keyframes.gradientMove,
    '@keyframes float': keyframes.float,
    '@keyframes textShimmer': keyframes.textShimmer,
    style: {
      animationName: 'gradientMove, float, textShimmer',
    }
  };

  // CSS style rules to be injected as a style tag
  const cssRules = `
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes textShimmer {
      0% { background-position: -200% 50%; }
      100% { background-position: 200% 50%; }
    }
    
    .logo-animation {
      animation: float 3s ease-in-out infinite;
    }
    
    .decoration-animation {
      animation: gradientMove 15s ease infinite;
    }
    
    .text-shimmer {
      animation: textShimmer 3s linear infinite;
    }
  `;

  return (
    <div style={styles.dashboardContainer}>
      {/* Inject CSS animations */}
      <style dangerouslySetInnerHTML={{__html: cssRules}} />
      
      {/* Background Decorations */}
      <div style={{...styles.decorationBox, ...styles.decorationBox1}} className="decoration-animation"></div>
      <div style={{...styles.decorationBox, ...styles.decorationBox2}} className="decoration-animation"></div>
      <div style={styles.decorationCircle} className="decoration-animation"></div>
      
    
      
      {/* Welcome Card */}
      <div style={styles.welcomeCard}>
        <div style={styles.iconContainer}>
          <span style={styles.icon}>👋</span>
        </div>
        <h1 
          style={styles.welcomeHeading} 
          className="text-shimmer"
          onMouseEnter={() => setHoverHeading(true)}
          onMouseLeave={() => setHoverHeading(false)}
        >
          Selamat Datang, Admin!
        </h1>
        <p 
          style={styles.welcomeText}
          className="text-shimmer"
          onMouseEnter={() => setHoverText(true)}
          onMouseLeave={() => setHoverText(false)}
        >
          Semoga harimu menyenangkan 
        </p>
      </div>
    </div>
  );
}