import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p className="welcome-text">Selamat datang di panel Sistem Manajemen Penyewaan</p>
      
      <div className="stats-cards">
        <div className="stats-card total-user">
          <div className="card-content">
            <div className="card-text">
              <p className="card-title">TOTAL USER</p>
              <p className="card-value">125</p>
            </div>
            <div className="card-icon">
              <div className="user-icon"></div>
            </div>
          </div>
        </div>
        
        <div className="stats-card permohonan-aktif">
          <div className="card-content">
            <div className="card-text">
              <p className="card-title">PERMOHONAN AKTIF</p>
              <p className="card-value">53</p>
            </div>
            <div className="card-icon">
              <div className="document-icon"></div>
            </div>
          </div>
        </div>
        
        <div className="stats-card objek-retribusi">
          <div className="card-content">
            <div className="card-text">
              <p className="card-title">OBJEK RETRIBUSI</p>
              <p className="card-value">87</p>
            </div>
            <div className="card-icon">
              <div className="building-icon"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="permohonan-section">
        <div className="section-header">
          <h2>Permohonan Terbaru</h2>
          <button className="add-data-button">
            <span className="plus-icon">+</span> Tambah Data
          </button>
        </div>
        
        <div className="table-container">
          <table className="permohonan-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama Pemohon</th>
                <th>Jenis permohonan</th>
                <th>Objek Retribusi</th>
                <th>Tanggal Pengajuan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Febri Siloen</td>
                <td>Sewa Tahunan</td>
                <td>Kios Pasar porsea</td>
                <td>15/04/2025</td>
                <td>
                  <span className="status-badge proses">Proses</span>
                </td>
                <td className="action-buttons">
                  <button className="view-button"></button>
                  <button className="edit-button"></button>
                  <button className="delete-button"></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;