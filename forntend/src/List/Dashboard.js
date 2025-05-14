import { useState, useEffect } from 'react';

export default function TapatupaContent() {
  // Styles dengan tampilan yang lebih menarik (tetap background putih)
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'white',
      color: '#333',
      fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
      padding: '40px 20px',
      maxWidth: '1280px',
      margin: '0 auto'
    },
    headerSection: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    logo: {
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: '0 auto 16px',
      boxShadow: '0 10px 15px -3px rgba(236, 72, 153, 0.2)'
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '10px'
    },
    subHeading: {
      fontSize: '1.1rem',
      color: '#6b7280',
      maxWidth: '600px',
      margin: '0 auto'
    },
    aboutSection: {
      background: 'white',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
      border: '1px solid #f3f4f6',
      marginBottom: '60px'
    },
    aboutHeader: {
      padding: '28px 36px',
      borderBottom: '1px solid #f3f4f6',
      background: 'linear-gradient(to right, #fafafa, white)',
      display: 'flex',
      alignItems: 'center'
    },
    headerDecoration: {
      width: '6px',
      height: '32px',
      background: 'linear-gradient(to bottom, #ec4899, #8b5cf6)',
      borderRadius: '12px',
      marginRight: '16px'
    },
    aboutTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      margin: 0,
      color: '#111827'
    },
    aboutBody: {
      padding: '36px'
    },
    aboutText: {
      color: '#4b5563',
      marginBottom: '40px',
      lineHeight: '1.8',
      fontSize: '1.1rem',
      maxWidth: '800px'
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px'
    },
    featureItem: {
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02)',
      border: '1px solid #f3f4f6',
      transition: 'all 0.3s ease'
    },
    featureItemHover: {
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)'
      }
    },
    featureItem1: {
      borderTop: '4px solid #ec4899'
    },
    featureItem2: {
      borderTop: '4px solid #8b5cf6'
    },
    featureItem3: {
      borderTop: '4px solid #f59e0b'
    },
    featureItem4: {
      borderTop: '4px solid #ef4444'
    },
    featureIconContainer: {
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '16px',
      marginBottom: '24px',
      transition: 'all 0.3s ease'
    },
    iconContainer1: {
      background: 'rgba(236, 72, 153, 0.1)'
    },
    iconContainer2: {
      background: 'rgba(139, 92, 246, 0.1)'
    },
    iconContainer3: {
      background: 'rgba(245, 158, 11, 0.1)'
    },
    iconContainer4: {
      background: 'rgba(239, 68, 68, 0.1)'
    },
    featureIcon: {
      fontSize: '2rem'
    },
    featureTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#111827'
    },
    featureText: {
      color: '#6b7280',
      lineHeight: '1.7',
      margin: 0
    }
  };

  // Function to generate hover effects since inline styles don't support :hover
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div style={styles.container}>
      {/* Header with Logo */}
      <div style={styles.headerSection}>
        <div style={styles.logo}>T</div>
        <h1 style={styles.heading}>Tapatupa</h1>
        <p style={styles.subHeading}>Platform pengelolaan sewa modern untuk pengalaman yang lebih terorganisir</p>
      </div>
      
      {/* About Tapatupa */}
      <div style={styles.aboutSection}>
        <div style={styles.aboutHeader}>
          <div style={styles.headerDecoration}></div>
          <h2 style={styles.aboutTitle}>Tentang Tapatupa</h2>
        </div>
        <div style={styles.aboutBody}>
          <p style={styles.aboutText}>
            Tapatupa adalah platform pengelolaan sewa yang membantu menyederhanakan proses penyewaan properti.
            Kami menyediakan solusi untuk mengelola penyewa, permohonan sewa, jangka waktu, dan retribusi dengan
            antarmuka yang ramah pengguna. Tapatupa hadir untuk memastikan pengelolaan sewa Anda berjalan lancar dan
            terorganisir.
          </p>
          
          <div style={styles.featureGrid}>
            {/* Feature 1 */}
            <div 
              style={{
                ...styles.featureItem, 
                ...styles.featureItem1,
                boxShadow: hoveredFeature === 1 ? '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)' : '0 4px 6px rgba(0, 0, 0, 0.02)',
                transform: hoveredFeature === 1 ? 'translateY(-5px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredFeature(1)} 
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div style={{
                ...styles.featureIconContainer, 
                ...styles.iconContainer1,
                background: hoveredFeature === 1 ? 'rgba(236, 72, 153, 0.15)' : 'rgba(236, 72, 153, 0.1)'
              }}>
                <span style={styles.featureIcon}>👥</span>
              </div>
              <h3 style={styles.featureTitle}>Manajemen Pengguna</h3>
              <p style={styles.featureText}>Kelola data pengguna dan penyewa dengan mudah dan intuitif</p>
            </div>
            
            {/* Feature 2 */}
            <div 
              style={{
                ...styles.featureItem, 
                ...styles.featureItem2,
                boxShadow: hoveredFeature === 2 ? '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)' : '0 4px 6px rgba(0, 0, 0, 0.02)',
                transform: hoveredFeature === 2 ? 'translateY(-5px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredFeature(2)} 
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div style={{
                ...styles.featureIconContainer, 
                ...styles.iconContainer2,
                background: hoveredFeature === 2 ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)'
              }}>
                <span style={styles.featureIcon}>📝</span>
              </div>
              <h3 style={styles.featureTitle}>Permohonan Sewa</h3>
              <p style={styles.featureText}>Proses permohonan dengan cepat dan tanpa kerumitan</p>
            </div>
            
            {/* Feature 3 */}
            <div 
              style={{
                ...styles.featureItem, 
                ...styles.featureItem3,
                boxShadow: hoveredFeature === 3 ? '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)' : '0 4px 6px rgba(0, 0, 0, 0.02)',
                transform: hoveredFeature === 3 ? 'translateY(-5px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredFeature(3)} 
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div style={{
                ...styles.featureIconContainer, 
                ...styles.iconContainer3,
                background: hoveredFeature === 3 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.1)'
              }}>
                <span style={styles.featureIcon}>⏱️</span>
              </div>
              <h3 style={styles.featureTitle}>Jangka Waktu</h3>
              <p style={styles.featureText}>Atur periode sewa dengan sistem yang fleksibel</p>
            </div>
            
            {/* Feature 4 */}
            <div 
              style={{
                ...styles.featureItem, 
                ...styles.featureItem4,
                boxShadow: hoveredFeature === 4 ? '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)' : '0 4px 6px rgba(0, 0, 0, 0.02)',
                transform: hoveredFeature === 4 ? 'translateY(-5px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredFeature(4)} 
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div style={{
                ...styles.featureIconContainer, 
                ...styles.iconContainer4,
                background: hoveredFeature === 4 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)'
              }}>
                <span style={styles.featureIcon}>💰</span>
              </div>
              <h3 style={styles.featureTitle}>Retribusi</h3>
              <p style={styles.featureText}>Pantau dan kelola pembayaran secara terstruktur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


