import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import {
  FaTachometerAlt,
  FaUser,
  FaFileAlt,
  FaClock,
  FaBuilding,
  FaTag,
  FaBox,
  FaUsers,
  FaChevronDown,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  // Check current path to auto-expand relevant menus on page load
  useEffect(() => {
    const path = location.pathname;
    
    // Auto expand menus based on current path
    if (path.includes("/pengguna")) {
      setOpenMenus(prev => ({ ...prev, pengguna: true }));
    } else if (path.includes("/permohonan")) {
      setOpenMenus(prev => ({ ...prev, permohonan: true }));
    } else if (path.includes("/jangka-waktu")) {
      setOpenMenus(prev => ({ ...prev, jangkaWaktu: true }));
    } else if (path.includes("/objek-retribusi")) {
      setOpenMenus(prev => ({ ...prev, objekRetribusi: true }));
    } else if (path.includes("/status")) {
      setOpenMenus(prev => ({ ...prev, status: true }));
    } else if (path.includes("/peruntukan")) {
      setOpenMenus(prev => ({ ...prev, peruntukan: true }));
    } else if (path.includes("/wajib-retribusi")) {
      setOpenMenus(prev => ({ ...prev, wajibRetribusi: true }));
    }
  }, [location]);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
    // Usually would include code to clear session/tokens and redirect to login
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h2 className="title">TobaLink</h2>
      </div>

      <div className="panel-admin">PANEL ADMIN</div>

      <ul className="menu">
        <li className={`menu-item ${isActive("/") ? "active" : ""}`}>
          <Link to="/">
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>

        <li className="menu-item" onClick={() => toggleMenu("pengguna")}>
          <div className="menu-header">
            <FaUser /> Pengguna{" "}
            {openMenus.pengguna ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        </li>
        {openMenus.pengguna && (
          <ul className="submenu">
            <li className={isActive("/pengguna/data-user") ? "active" : ""}>
              <Link to="/pengguna/data-user">Data User</Link>
            </li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("permohonan")}>
          <div className="menu-header">
            <FaFileAlt /> Permohonan{" "}
            {openMenus.permohonan ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        </li>
        {openMenus.permohonan && (
          <ul className="submenu">
            <li className={isActive("/permohonan/jenis") ? "active" : ""}>
              <Link to="/permohonan/jenis">Jenis Permohonan</Link>
            </li>
            <li className={isActive("/permohonan/sewa") ? "active" : ""}>
              <Link to="/permohonan/sewa">Permohonan Sewa</Link>
            </li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("jangkaWaktu")}>
          <div className="menu-header">
            <FaClock /> Jangka Waktu{" "}
            {openMenus.jangkaWaktu ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        </li>
        {openMenus.jangkaWaktu && (
          <ul className="submenu">
            <li className={isActive("/jangka-waktu/jenis") ? "active" : ""}>
              <Link to="/jangka-waktu/jenis">Jenis Jangka waktu</Link>
            </li>
            <li className={isActive("/jangka-waktu/sewa") ? "active" : ""}>
              <Link to="/jangka-waktu/sewa">Jangka Waktu Sewa</Link>
            </li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("objekRetribusi")}>
          <div className="menu-header">
            <FaBuilding /> Objek Retribusi{" "}
            {openMenus.objekRetribusi ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        </li>
        {openMenus.objekRetribusi && (
          <ul className="submenu">
            <li className={isActive("/objek-retribusi/data") ? "active" : ""}>
              <Link to="/objek-retribusi/data">Data Objek Retribusi</Link>
            </li>
            <li className={isActive("/objek-retribusi/jenis") ? "active" : ""}>
              <Link to="/objek-retribusi/jenis">Jenis Objek Retribusi</Link>
            </li>
            <li className={isActive("/objek-retribusi/lokasi") ? "active" : ""}>
              <Link to="/objek-retribusi/lokasi">Lokasi Objek Retribusi</Link>
            </li>
            <li className={isActive("/objek-retribusi/tarif") ? "active" : ""}>
              <Link to="/objek-retribusi/tarif">Tarif Objek Retribusi</Link>
            </li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("status")}>
          <div className="menu-header">
            <FaTag /> Status{" "}
            {openMenus.status ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        </li>
        {openMenus.status && (
          <ul className="submenu">
            <li className={isActive("/status/data") ? "active" : ""}>
              <Link to="/status/data">Data Status</Link>
            </li>
            <li className={isActive("/status/jenis") ? "active" : ""}>
              <Link to="/status/jenis">Jenis Status</Link>
            </li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("peruntukan")}>
          <div className="menu-header">
            <FaBox /> Peruntukan{" "}
            {openMenus.peruntukan ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        </li>
        {openMenus.peruntukan && (
          <ul className="submenu">
            <li className={isActive("/peruntukan/sewa") ? "active" : ""}>
              <Link to="/peruntukan/sewa">Peruntukan Sewa</Link>
            </li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("wajibRetribusi")}>
          <div className="menu-header">
            <FaUsers /> Wajib Retribusi{" "}
            {openMenus.wajibRetribusi ? <FaChevronDown /> : <FaChevronRight />}
          </div>
        </li>
        {openMenus.wajibRetribusi && (
          <ul className="submenu">
            <li className={isActive("/wajib-retribusi/data") ? "active" : ""}>
              <Link to="/wajib-retribusi/data">Data Wajib Retribusi</Link>
            </li>
          </ul>
        )}
      </ul>

      <div className="pengaturan">PENGATURAN</div>

      <ul className="menu">
        <li className="menu-item keluar" onClick={handleLogout}>
          <Link to="/login">
            <FaSignOutAlt /> Keluar
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;