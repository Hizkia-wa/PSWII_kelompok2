import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Users, FileText, Database, Tag, List, LogOut, BarChart2, User } from 'lucide-react';

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

  const toggleMenu = (menu) => {
    setExpandedMenus({
      ...expandedMenus,
      [menu]: !expandedMenus[menu]
    });
  };

  // CSS Styles
  const styles = {
    sidebar: {
      height: '100vh',
      width: '256px',
      background: 'linear-gradient(to bottom, #172554, #1e3a8a)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    },
    header: {
      padding: '20px',
      borderBottom: '1px solid rgba(30, 64, 175, 0.5)'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoContainer: {
      borderRadius: '50%',
      backgroundColor: '#d97706',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 15px rgba(146, 64, 14, 0.3)'
    },
    logo: {
      width: '40px',
      height: '40px',
      borderRadius: '50%'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, white, #bfdbfe)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    sectionLabel: {
      padding: '12px 20px',
      fontSize: '12px',
      fontWeight: '600',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#93c5fd'
    },
    menuContainer: {
      flexGrow: 1,
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#1e40af transparent'
    },
    menuItem: (isActive) => ({
      padding: '12px 16px',
      margin: '4px 8px',
      backgroundColor: isActive ? 'rgba(30, 64, 175, 0.3)' : 'transparent',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: 'rgba(30, 64, 175, 0.5)'
      }
    }),
    menuItemContent: {
      display: 'flex',
      alignItems: 'center'
    },
    iconContainer: {
      width: '32px',
      height: '32px',
      borderRadius: '6px',
      backgroundColor: 'rgba(59, 130, 246, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px'
    },
    iconContainerLogout: {
      width: '32px',
      height: '32px',
      borderRadius: '6px',
      backgroundColor: 'rgba(239, 68, 68, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px'
    },
    menuText: {
      fontWeight: '500'
    },
    chevron: (isExpanded) => ({
      color: '#93c5fd',
      transition: 'transform 0.2s ease',
      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
    }),
    submenu: {
      paddingLeft: '56px',
      paddingRight: '16px',
      paddingTop: '4px',
      paddingBottom: '4px'
    },
    submenuItem: {
      padding: '8px 12px',
      fontSize: '14px',
      color: '#bfdbfe',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'colors 0.15s ease',
      ':hover': {
        color: 'white',
        backgroundColor: 'rgba(59, 130, 246, 0.4)'
      }
    },
    logoutButton: {
      margin: '12px 16px 24px 16px',
      background: 'linear-gradient(to right, #dc2626, #b91c1c)',
      borderRadius: '8px',
      boxShadow: '0 10px 15px rgba(185, 28, 28, 0.2)',
      transition: 'all 0.3s ease',
      ':hover': {
        background: 'linear-gradient(to right, #b91c1c, #991b1b)'
      }
    },
    logoutContent: {
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    }
  };

  // Custom hover handling for menu items
  const handleMouseEnter = (e, isMenuItem) => {
    if (isMenuItem) {
      e.currentTarget.style.backgroundColor = 'rgba(30, 64, 175, 0.5)';
    } else {
      e.currentTarget.style.color = 'white';
      e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.4)';
    }
  };

  const handleMouseLeave = (e, isMenuItem, isActive) => {
    if (isMenuItem) {
      e.currentTarget.style.backgroundColor = isActive ? 'rgba(30, 64, 175, 0.3)' : 'transparent';
    } else {
      e.currentTarget.style.color = '#bfdbfe';
      e.currentTarget.style.backgroundColor = 'transparent';
    }
  };

  // Inline styles for elements that need hover effects
  const getMenuItemStyle = (isActive) => ({
    ...styles.menuItem(isActive),
    backgroundColor: isActive ? 'rgba(30, 64, 175, 0.3)' : 'transparent',
  });

  const getSubmenuItemStyle = () => ({
    ...styles.submenuItem,
    color: '#bfdbfe',
    backgroundColor: 'transparent',
  });

  const getLogoutButtonStyle = () => ({
    ...styles.logoutButton,
    background: 'linear-gradient(to right, #dc2626, #b91c1c)',
  });

  return (
    <div style={styles.sidebar}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoContainer}>
           <img src="/background.png" alt="TobaLink Logo" style={styles.logo} />
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
            style={getMenuItemStyle(false)}
            onMouseEnter={(e) => handleMouseEnter(e, true)}
            onMouseLeave={(e) => handleMouseLeave(e, true, false)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <BarChart2 size={18} style={{ color: '#bfdbfe' }} />
              </div>
              <span style={styles.menuText}>Dashboard</span>
            </div>
          </div>
        </Link>
        
        {/* Pengguna */}
        <div className="menu-item">
          <div 
            style={getMenuItemStyle(expandedMenus.pengguna)}
            onClick={() => toggleMenu('pengguna')}
            onMouseEnter={(e) => handleMouseEnter(e, true)}
            onMouseLeave={(e) => handleMouseLeave(e, true, expandedMenus.pengguna)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <Users size={18} style={{ color: '#bfdbfe' }} />
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
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
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
            style={getMenuItemStyle(expandedMenus.permohonan)}
            onClick={() => toggleMenu('permohonan')}
            onMouseEnter={(e) => handleMouseEnter(e, true)}
            onMouseLeave={(e) => handleMouseLeave(e, true, expandedMenus.permohonan)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <FileText size={18} style={{ color: '#bfdbfe' }} />
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
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
                >
                  Jenis Permohonan
                </div>
              </Link>
              <Link to="/permohonansewa" style={styles.link}>
                <div 
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
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
            style={getMenuItemStyle(expandedMenus.jangkaWaktu)}
            onClick={() => toggleMenu('jangkaWaktu')}
            onMouseEnter={(e) => handleMouseEnter(e, true)}
            onMouseLeave={(e) => handleMouseLeave(e, true, expandedMenus.jangkaWaktu)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <Clock size={18} style={{ color: '#bfdbfe' }} />
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
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
                >
                  Jenis Jangka Waktu
                </div>
              </Link>
              <Link to="/jangkawaktusewa" style={styles.link}>
                <div 
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
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
            style={getMenuItemStyle(expandedMenus.objekRetribusi)}
            onClick={() => toggleMenu('objekRetribusi')}
            onMouseEnter={(e) => handleMouseEnter(e, true)}
            onMouseLeave={(e) => handleMouseLeave(e, true, expandedMenus.objekRetribusi)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <Database size={18} style={{ color: '#bfdbfe' }} />
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
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
                >
                  Data Objek Retribusi
                </div>
              </Link>
              <Link to="/jenisobjekretribusi" style={styles.link}>
                <div 
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
                >
                  Jenis Objek Retribusi
                </div>
              </Link>
              <Link to="/lokasiobjekretribusi" style={styles.link}>
                <div 
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
                >
                  Lokasi Objek Retribusi
                </div>
              </Link>
              <Link to="/tarifobjekretribusi" style={styles.link}>
                <div 
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
                >
                  Tarif Objek Retribusi
                </div>
              </Link>
            </div>
          )}
        </div>
        
        {/* Status */}
        <div className="menu-item">
          <div 
            style={getMenuItemStyle(expandedMenus.status)}
            onClick={() => toggleMenu('status')}
            onMouseEnter={(e) => handleMouseEnter(e, true)}
            onMouseLeave={(e) => handleMouseLeave(e, true, expandedMenus.status)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <Tag size={18} style={{ color: '#bfdbfe' }} />
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
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
                >
                  Data Status
                </div>
              </Link>
              <Link to="/jenisstatus" style={styles.link}>
                <div 
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
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
            style={getMenuItemStyle(expandedMenus.peruntukan)}
            onClick={() => toggleMenu('peruntukan')}
            onMouseEnter={(e) => handleMouseEnter(e, true)}
            onMouseLeave={(e) => handleMouseLeave(e, true, expandedMenus.peruntukan)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <List size={18} style={{ color: '#bfdbfe' }} />
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
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
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
            style={getMenuItemStyle(expandedMenus.wajibRetribusi)}
            onClick={() => toggleMenu('wajibRetribusi')}
            onMouseEnter={(e) => handleMouseEnter(e, true)}
            onMouseLeave={(e) => handleMouseLeave(e, true, expandedMenus.wajibRetribusi)}
          >
            <div style={styles.menuItemContent}>
              <div style={styles.iconContainer}>
                <User size={18} style={{ color: '#bfdbfe' }} />
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
                  style={getSubmenuItemStyle()}
                  onMouseEnter={(e) => handleMouseEnter(e, false)}
                  onMouseLeave={(e) => handleMouseLeave(e, false)}
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
      <Link to="/logout" style={styles.link}>
        <div 
          style={getLogoutButtonStyle()}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #b91c1c, #991b1b)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #dc2626, #b91c1c)';
          }}
        >
          <div style={styles.logoutContent}>
            <div style={styles.iconContainerLogout}>
              <LogOut size={18} style={{ color: '#fee2e2' }} />
            </div>
            <span style={styles.menuText}>Keluar</span>
          </div>
        </div>
      </Link>
    </div>
  );
}