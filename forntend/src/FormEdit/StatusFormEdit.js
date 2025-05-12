import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function StatusFormEdit() {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();
  const [namaStatus, setNamaStatus] = useState('');
  const [keterangan, setKeterangan] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/status/${id}`);
        const data = res.data.data;
        setNamaStatus(data.namaStatus);
        setKeterangan(data.keterangan || '');
      } catch (err) {
        console.error('Gagal mengambil detail status:', err);
        alert('Status tidak ditemukan!');
        navigate('/status'); // Redirect ke daftar status jika gagal
      }
    };

    if (id) fetchStatus();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/status/${id}`, {
        namaStatus,
        keterangan,
        idJenisStatus: 1 // Ganti jika kamu pakai pilihan dinamis
      });
      alert('Berhasil mengubah status!');
      navigate('/status');
    } catch (error) {
      console.error('Gagal mengedit status:', error);
      alert('Gagal mengedit status!');
    }
  };

  return (
    <div>
      <h2>Edit Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Status</label><br />
          <input
            type="text"
            value={namaStatus}
            onChange={(e) => setNamaStatus(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Keterangan</label><br />
          <textarea
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default StatusFormEdit;
