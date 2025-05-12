import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StatusFormEdit({ id, onSuccess }) {
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
      }
    };
    if (id) fetchStatus();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/status/${id}`, {
        namaStatus,
        keterangan,
        idJenisStatus: 1 // sesuaikan jika dinamis
      });
      alert('Berhasil mengubah status!');
      onSuccess();
    } catch (error) {
      console.error('Gagal mengedit status:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Status</h3>
      <input
        type="text"
        value={namaStatus}
        onChange={(e) => setNamaStatus(e.target.value)}
        required
      />
      <br />
      <textarea
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
      />
      <br />
      <button type="submit">Update</button>
    </form>
  );
}

export default StatusFormEdit;
