import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LokasiObjekRetribusiFormEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    lokasiObjekRetribusi: '',
    keterangan: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/lokasi-objek-retribusi/${id}`)
      .then(res => {
        setFormData(res.data.data);
      })
      .catch(err => {
        console.error('Gagal mengambil data:', err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/lokasi-objek-retribusi/${id}`, formData)
      .then(response => {
        alert('Data berhasil diperbarui!');
      })
      .catch(error => {
        console.error('Gagal memperbarui:', error);
        alert('Gagal memperbarui data.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Lokasi Objek Retribusi</h2>
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
      <button type="submit">Update</button>
    </form>
  );
};

export default LokasiObjekRetribusiFormEdit;
