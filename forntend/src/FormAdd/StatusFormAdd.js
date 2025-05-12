import React, { useState } from 'react';
import axios from 'axios';

function StatusFormAdd({ onSuccess }) {
  const [namaStatus, setNamaStatus] = useState('');
  const [keterangan, setKeterangan] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/status', {
        namaStatus,
        keterangan,
        idJenisStatus: 1 // sesuaikan jika dinamis
      });
      alert('Berhasil menambahkan status!');
      onSuccess();
    } catch (error) {
      console.error('Gagal menambahkan status:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Tambah Status</h3>
      <input
        type="text"
        placeholder="Nama Status"
        value={namaStatus}
        onChange={(e) => setNamaStatus(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Keterangan"
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
      />
      <br />
      <button type="submit">Simpan</button>
    </form>
  );
}

export default StatusFormAdd;
