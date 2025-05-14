import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Clock, 
  Users, 
  FileText, 
  Database, 
  Tag, 
  List, 
  LogOut, 
  User,
  Building, 
  Store,
  Settings,
  Home
} from 'lucide-react';

export default function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState({
    pengguna: false,
    permohonan: false,
    jangkaWaktu: false,
    objekRetribusi: false,
    status: false,
    peruntukan: false,
    wajibRetribusi: false
  });
  
  // State to track content height
  const [contentHeight, setContentHeight] = useState(0);

  // Effect to calculate and update content height
  useEffect(() => {
    const updateContentHeight = () => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        setContentHeight(mainContent.scrollHeight);
      } else {
        // If main content not found, use document height as fallback
        setContentHeight(Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        ));
      }
    };

    // Initial calculation
    updateContentHeight();
    
    // Set up event listener for window resize
    window.addEventListener('resize', updateContentHeight);
    
    // Set up a mutation observer to detect content changes
    const observer = new MutationObserver(updateContentHeight);
    const targetNode = document.body;
    observer.observe(targetNode, { childList: true, subtree: true });
    
    // Clean up
    return () => {
      window.removeEventListener('resize', updateContentHeight);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = (menu) => {
    setExpandedMenus({
      ...expandedMenus,
      [menu]: !expandedMenus[menu]
    });
  };

  const colors = {
    primary: '#0c3144', 
    secondary: '#072638', 
    highlight: '#0f3d53', 
    active: '#124b66', 
    textPrimary: '#ffffff',
    textSecondary: '#94b3c5',
    accentPrimary: '#d97706', 
    accentSecondary: '#d97706', 
    border: 'rgba(30, 58, 73, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.3)',
    iconBg: 'rgba(15, 61, 83, 0.5)'
  };

  // CSS Styles
  const styles = {
    sidebar: {
      minHeight: '100vh', // Minimum height
      height: `${Math.max(contentHeight, window.innerHeight)}px`, // Dynamic height
      width: '250px',
      background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})`,
      color: colors.textPrimary,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: `0 10px 25px ${colors.shadow}`,
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      position: 'sticky', // Changed from relative to sticky
      top: 0, // Stick to the top
      zIndex: 10,
      borderRight: `1px solid ${colors.border}`
    },
    header: {
      padding: '20px',
      borderBottom: `1px solid ${colors.border}`,
      marginBottom: '10px'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoContainer: {
      borderRadius: '50%',
      backgroundColor: colors.accentPrimary,
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 5px 15px rgba(146, 64, 14, 0.3)'
    },
    logo: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover' // Ensures the image fits within the circular container
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, white, #b1cfe0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    sectionLabel: {
      padding: '12px 20px 8px 20px',
      fontSize: '12px',
      fontWeight: '600',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: colors.textSecondary,
      borderBottom: `1px solid ${colors.border}`,
      backgroundColor: colors.secondary
    },
    menuContainer: {
      flexGrow: 1,
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: `${colors.highlight} transparent`
    },
    menuItem: (isActive) => ({
      padding: '12px 16px',
      margin: '2px 0',
      backgroundColor: isActive ? colors.active : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      position: 'relative',
      overflow: 'hidden'
    }),
    menuItemContent: {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    iconContainer: {
      width: '32px',
      height: '32px',
      borderRadius: '6px',
      backgroundColor: colors.iconBg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px'
    },
    iconContainerLogout: {
      width: '32px',
      height: '32px',
      borderRadius: '6px',
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px'
    },
    menuText: {
      fontWeight: '500'
    },
    chevron: (isExpanded) => ({
      color: colors.textSecondary,
      transition: 'transform 0.3s ease, color 0.2s ease',
      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
    }),
    submenu: {
      backgroundColor: colors.secondary,
      transition: 'max-height 0.3s ease, opacity 0.2s ease',
      overflow: 'hidden',
      opacity: 1,
      maxHeight: '500px' // Large enough for all submenu items
    },
    submenuItem: {
      padding: '10px 12px 10px 56px',
      fontSize: '14px',
      color: colors.textSecondary,
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    logoutSection: {
      borderTop: `1px solid ${colors.border}`,
      padding: '10px 0'
    },
    logoutButton: {
      margin: '5px 10px',
      background: 'linear-gradient(to right, #c53030, #9b2c2c)',
      borderRadius: '8px',
      boxShadow: '0 5px 10px rgba(185, 28, 28, 0.15)',
      transition: 'all 0.3s ease',
    },
    logoutContent: {
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
      width: '100%'
    },
    ripple: {
      position: 'absolute',
      borderRadius: '50%',
      transform: 'scale(0)',
      animation: 'ripple 0.6s linear',
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    '@keyframes ripple': {
      'to': {
        transform: 'scale(4)',
        opacity: 0
      }
    }
  };

  // Ripple effect handler
  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    
    // Remove existing ripples
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  // Add ripple keyframes to document
  const addRippleKeyframes = () => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.getElementsByTagName('head')[0].appendChild(style);
  };

  // Call once on component mount
  useEffect(() => {
    addRippleKeyframes();
  }, []);

  // Menu item hover handler
  const handleMenuItemHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.backgroundColor = colors.highlight;
    } else {
      e.currentTarget.style.backgroundColor = 'transparent';
    }
  };

  // Submenu item hover handler
  const handleSubmenuItemHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.backgroundColor = colors.highlight;
      e.currentTarget.style.color = colors.textPrimary;
    } else {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = colors.textSecondary;
    }
  };

  return (
    <div style={styles.sidebar}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoContainer}>
            <img
              src={`${process.env.PUBLIC_URL}/background.png`} 
              alt="TobaLink Logo"
              style={styles.logo}
            />
          </div>
          <h1 style={styles.title}>TobaLink</h1>
        </div>
      </div>
      
      {/* Admin Panel Label */}
      <div style={styles.sectionLabel}>
        Panel Admin
      </div>
      
      {/* Menu Items */}
      <div style={styles.menuContainer}>
        {/* Dashboard */}
        <Link to="/dashboard" style={styles.link}>
          <div 
            style={{
              ...styles.menuItem(false),
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => handleMenuItemHover(e, true)}
            onMouseLeave={(e) => handleMenuItemHover(e, false)}
            onClick={createRipple}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <Home size={18} style={{ color: colors.textSecondary }} />
              </div>
              <span style={styles.menuText}>Dashboard</span>
            </div>
          </div>
        </Link>
        
        {/* Pengguna */}
        <div className="menu-item">
          <div 
            style={{
              ...styles.menuItem(expandedMenus.pengguna),
              backgroundColor: expandedMenus.pengguna ? colors.active : 'transparent',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={(e) => {
              toggleMenu('pengguna');
              createRipple(e);
            }}
            onMouseEnter={(e) => !expandedMenus.pengguna && handleMenuItemHover(e, true)}
            onMouseLeave={(e) => !expandedMenus.pengguna && handleMenuItemHover(e, false)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <Users size={18} style={{ color: colors.textSecondary }} />
              </div>
              <span style={styles.menuText}>Pengguna</span>
            </div>
            <ChevronRight 
              size={16} 
              style={styles.chevron(expandedMenus.pengguna)} 
            />
          </div>
          
          {expandedMenus.pengguna && (
            <div style={styles.submenu}>
              <Link to="/user" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Data User
                </div>
              </Link>
            </div>
          )}
        </div>
        
        {/* Permohonan */}
        <div className="menu-item">
          <div 
            style={{
              ...styles.menuItem(expandedMenus.permohonan),
              backgroundColor: expandedMenus.permohonan ? colors.active : 'transparent',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={(e) => {
              toggleMenu('permohonan');
              createRipple(e);
            }}
            onMouseEnter={(e) => !expandedMenus.permohonan && handleMenuItemHover(e, true)}
            onMouseLeave={(e) => !expandedMenus.permohonan && handleMenuItemHover(e, false)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <FileText size={18} style={{ color: colors.textSecondary }} />
              </div>
              <span style={styles.menuText}>Permohonan</span>
            </div>
            <ChevronRight 
              size={16} 
              style={styles.chevron(expandedMenus.permohonan)} 
            />
          </div>
          
          {expandedMenus.permohonan && (
            <div style={styles.submenu}>
              <Link to="/jenispermohonan" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Jenis Permohonan
                </div>
              </Link>
              <Link to="/permohonansewa" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Permohonan Sewa
                </div>
              </Link>
            </div>
          )}
        </div>
        
        {/* Jangka Waktu */}
        <div className="menu-item">
          <div 
            style={{
              ...styles.menuItem(expandedMenus.jangkaWaktu),
              backgroundColor: expandedMenus.jangkaWaktu ? colors.active : 'transparent',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={(e) => {
              toggleMenu('jangkaWaktu');
              createRipple(e);
            }}
            onMouseEnter={(e) => !expandedMenus.jangkaWaktu && handleMenuItemHover(e, true)}
            onMouseLeave={(e) => !expandedMenus.jangkaWaktu && handleMenuItemHover(e, false)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <Clock size={18} style={{ color: colors.textSecondary }} />
              </div>
              <span style={styles.menuText}>Jangka Waktu</span>
            </div>
            <ChevronRight 
              size={16} 
              style={styles.chevron(expandedMenus.jangkaWaktu)} 
            />
          </div>
          
          {expandedMenus.jangkaWaktu && (
            <div style={styles.submenu}>
              <Link to="/jenisjangkawaktu" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Jenis Jangka Waktu
                </div>
              </Link>
              <Link to="/jangkawaktusewa" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Jangka Waktu Sewa
                </div>
              </Link>
            </div>
          )}
        </div>
        
        {/* Objek Retribusi */}
        <div className="menu-item">
          <div 
            style={{
              ...styles.menuItem(expandedMenus.objekRetribusi),
              backgroundColor: expandedMenus.objekRetribusi ? colors.active : 'transparent',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={(e) => {
              toggleMenu('objekRetribusi');
              createRipple(e);
            }}
            onMouseEnter={(e) => !expandedMenus.objekRetribusi && handleMenuItemHover(e, true)}
            onMouseLeave={(e) => !expandedMenus.objekRetribusi && handleMenuItemHover(e, false)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <Building size={18} style={{ color: colors.textSecondary }} />
              </div>
              <span style={styles.menuText}>Objek Retribusi</span>
            </div>
            <ChevronRight 
              size={16} 
              style={styles.chevron(expandedMenus.objekRetribusi)} 
            />
          </div>
          
          {expandedMenus.objekRetribusi && (
            <div style={styles.submenu}>
              <Link to="/dataobjekretribusi" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Data Objek Retribusi
                </div>
              </Link>
              <Link to="/jenisobjekretribusi" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Jenis Objek Retribusi
                </div>
              </Link>
              <Link to="/lokasiobjekretribusi" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Lokasi Objek Retribusi
                </div>
              </Link>
              <Link to="/tarifobjekretribusi" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Tarif Objek Retribusi
                </div>
              </Link>
            </div>
          )}
        </div>
        
     
        <div className="menu-item">
          <div 
            style={{
              ...styles.menuItem(expandedMenus.status),
              backgroundColor: expandedMenus.status ? colors.active : 'transparent',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={(e) => {
              toggleMenu('status');
              createRipple(e);
            }}
            onMouseEnter={(e) => !expandedMenus.status && handleMenuItemHover(e, true)}
            onMouseLeave={(e) => !expandedMenus.status && handleMenuItemHover(e, false)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <Tag size={18} style={{ color: colors.textSecondary }} />
              </div>
              <span style={styles.menuText}>Status</span>
            </div>
            <ChevronRight 
              size={16} 
              style={styles.chevron(expandedMenus.status)} 
            />
          </div>
          
          {expandedMenus.status && (
            <div style={styles.submenu}>
              <Link to="/datastatus" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Data Status
                </div>
              </Link>
              <Link to="/jenisstatus" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Jenis Status
                </div>
              </Link>
            </div>
          )}
        </div>
        
        {/* Peruntukan */}
        <div className="menu-item">
          <div 
            style={{
              ...styles.menuItem(expandedMenus.peruntukan),
              backgroundColor: expandedMenus.peruntukan ? colors.active : 'transparent',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={(e) => {
              toggleMenu('peruntukan');
              createRipple(e);
            }}
            onMouseEnter={(e) => !expandedMenus.peruntukan && handleMenuItemHover(e, true)}
            onMouseLeave={(e) => !expandedMenus.peruntukan && handleMenuItemHover(e, false)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <Store size={18} style={{ color: colors.textSecondary }} />
              </div>
              <span style={styles.menuText}>Peruntukan</span>
            </div>
            <ChevronRight 
              size={16} 
              style={styles.chevron(expandedMenus.peruntukan)} 
            />
          </div>
          
          {expandedMenus.peruntukan && (
            <div style={styles.submenu}>
              <Link to="/peruntukansewa" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Peruntukan Sewa
                </div>
              </Link>
            </div>
          )}
        </div>
        
        {/* Wajib Retribusi */}
        <div className="menu-item">
          <div 
            style={{
              ...styles.menuItem(expandedMenus.wajibRetribusi),
              backgroundColor: expandedMenus.wajibRetribusi ? colors.active : 'transparent',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={(e) => {
              toggleMenu('wajibRetribusi');
              createRipple(e);
            }}
            onMouseEnter={(e) => !expandedMenus.wajibRetribusi && handleMenuItemHover(e, true)}
            onMouseLeave={(e) => !expandedMenus.wajibRetribusi && handleMenuItemHover(e, false)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <User size={18} style={{ color: colors.textSecondary }} />
              </div>
              <span style={styles.menuText}>Wajib Retribusi</span>
            </div>
            <ChevronRight 
              size={16} 
              style={styles.chevron(expandedMenus.wajibRetribusi)} 
            />
          </div>
          
          {expandedMenus.wajibRetribusi && (
            <div style={styles.submenu}>
              <Link to="/wajibretribusi" style={styles.link}>
                <div 
                  style={{
                    ...styles.submenuItem,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => handleSubmenuItemHover(e, true)}
                  onMouseLeave={(e) => handleSubmenuItemHover(e, false)}
                  onClick={createRipple}
                >
                  Data Wajib Retribusi
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Pengaturan Label */}
      <div style={styles.sectionLabel}>
        Pengaturan
      </div>
      
      {/* Logout */}
      <div style={styles.logoutSection}>
        <Link to="/logout" style={styles.link}>
          <div
            style={{
              ...styles.logoutButton,
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                'linear-gradient(to right, #b91c1c, #991b1b)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 7px 15px rgba(185, 28, 28, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                'linear-gradient(to right, #c53030, #9b2c2c)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0 5px 10px rgba(185, 28, 28, 0.15)';
            }}
            onClick={(e) => {
              console.log("Logout clicked");
            }}
          >
            <div style={styles.logoutContent}>
              <div style={styles.iconContainerLogout}>
                <LogOut size={18} style={{ color: '#ef4444' }} />
              </div>
              <span style={styles.menuText}>Keluar</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}