import React, { useState } from "react";
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
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h2 className="title">TobaLink</h2>
      </div>

      <ul className="menu">
        <li className="menu-item active">
          <FaTachometerAlt /> Dashboard
        </li>

        <li className="menu-item" onClick={() => toggleMenu("pengguna")}>
          <FaUser /> Pengguna{" "}
          {openMenus.pengguna ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {openMenus.pengguna && (
          <ul className="submenu">
            <li>Data User</li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("permohonan")}>
          <FaFileAlt /> Permohonan{" "}
          {openMenus.permohonan ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {openMenus.permohonan && (
          <ul className="submenu">
            <li>Jenis Permohonan</li>
            <li>Permohonan Sewa</li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("jangkaWaktu")}>
          <FaClock /> Jangka Waktu{" "}
          {openMenus.jangkaWaktu ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {openMenus.jangkaWaktu && (
          <ul className="submenu">
            <li>Jenis Jangka waktu</li>
            <li>Jangka Waktu Sewa</li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("objekRetribusi")}>
          <FaBuilding /> Objek Retribusi{" "}
          {openMenus.objekRetribusi ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {openMenus.objekRetribusi && (
          <ul className="submenu">
            <li>Data Objek Retribusi</li>
            <li>Jenis Objek Retribusi</li>
            <li>Lokasi Objek Retribusi</li>
            <li>Tarif Objek Retribusi</li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("status")}>
          <FaTag /> Status{" "}
          {openMenus.status ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {openMenus.status && (
          <ul className="submenu">
            <li>Data Status</li>
            <li>Jenis Status</li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("peruntukan")}>
          <FaBox /> Peruntukan{" "}
          {openMenus.peruntukan ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {openMenus.peruntukan && (
          <ul className="submenu">
            <li>Peruntukan Sewa</li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("wajibRetribusi")}>
          <FaUsers /> Wajib Retribusi{" "}
          {openMenus.wajibRetribusi ? <FaChevronDown /> : <FaChevronRight />}
        </li>
        {openMenus.wajibRetribusi && (
          <ul className="submenu">
            <li>Data Wajib Retribusi</li>
          </ul>
        )}

        <hr className="divider" />

        <li className="menu-item keluar">
          <FaSignOutAlt /> Keluar
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
