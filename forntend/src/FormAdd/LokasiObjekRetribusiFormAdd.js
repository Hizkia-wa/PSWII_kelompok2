import React, { useState } from 'react';
import axios from 'axios';

const LokasiObjekRetribusiFormAdd = () => {
  const [formData, setFormData] = useState({
    lokasiObjekRetribusi: '',
    keterangan: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/lokasi-objek-retribusi', formData)
      .then(response => {
        alert('Data berhasil ditambahkan!');
        setFormData({ lokasiObjekRetribusi: '', keterangan: '' });
      })
      .catch(error => {
        console.error('Gagal menyimpan:', error);
        alert('Gagal menyimpan data.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Lokasi Objek Retribusi</h2>
      <label>
        Nama Lokasi:
        <input
          type="text"
          value={formData.lokasiObjekRetribusi}
          onChange={(e) => setFormData({ ...formData, lokasiObjekRetribusi: e.target.value })}
          required
        />
      </label>
      <br />
      <label>
        Keterangan:
        <textarea
          value={formData.keterangan}
          onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
        />
      </label>
      <br />
      <button type="submit">Simpan</button>
    </form>
  );
};

export default LokasiObjekRetribusiFormAdd;
