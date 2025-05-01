import React from "react";
import InfoCard from "../Components/InfoCard";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Selamat datang di panel Sistem Manajemen Penyewaan</p>

      <div className="card-container">
        <InfoCard title="Total User" value="125" icon="👥" color="blue" />
        <InfoCard title="Permohonan Aktif" value="53" icon="📄" color="green" />
        <InfoCard title="Objek Retribusi" value="87" icon="🏢" color="gray" />
      </div>

      <div className="permohonan">
        <h3>Permohonan Terbaru</h3>
        <button className="btn-tambah">+ Tambah Data</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Pemohon</th>
              <th>Jenis Permohonan</th>
              <th>Objek Retribusi</th>
              <th>Tanggal Pengajuan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>Hotdi Sibuan</td>
              <td>Sewa Tahunan</td>
              <td>Kios Pasar Porsea</td>
              <td>13/04/2025</td>
              <td>
                <span className="status proses">Proses</span>
              </td>
              <td>
                <button>👁️</button>
                <button>✏️</button>
                <button>🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
