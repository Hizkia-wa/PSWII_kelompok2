// src/Components/Sidebar.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUser, FaHome, FaMoneyBill, FaFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-[#003049] text-white p-4">
      <div className="text-center mb-6">
        <img src="/logo.png" alt="TapaTupa Logo" className="mx-auto w-16 h-16" />
        <h1 className="text-2xl font-bold mt-2">TapaTupa</h1>
      </div>
      <nav className="flex flex-col gap-3">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-[#2d6a8b]">
          <FaHome /> Dashboard
        </Link>
        <Link to="/daftar-user" className="flex items-center gap-2 px-4 py-2 rounded bg-[#00B4D8]">
          <FaUser /> Daftar User
        </Link>
        <Link to="/data-retribusi" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-[#2d6a8b]">
          <FaMoneyBill /> Data Retribusi
        </Link>
        <Link to="/wajib-retribusi" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-[#2d6a8b]">
          <FaFileAlt /> Wajib Retribusi
        </Link>
        <Link to="/permohonan-sewa" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-[#2d6a8b]">
          <FaFileAlt /> Permohonan Sewa
        </Link>
        <Link to="/pengaturan" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-[#2d6a8b]">
          <FaCog /> Pengaturan
        </Link>
        <Link to="/keluar" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-[#2d6a8b]">
          <FaSignOutAlt /> Keluar
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

