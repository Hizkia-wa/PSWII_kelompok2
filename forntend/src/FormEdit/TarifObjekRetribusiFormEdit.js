// src/pages/TarifObjekRetribusi/TarifEdit.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TarifObjekRetribusiFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    idObjekRetribusi: '',
    idJenisJangkaWaktu: '',
    tanggalDinilai: '',
    namaPenilai: '',
    nominalTarif: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/tarif-objek-retribusi/${id}`);
        setForm(response.data.data);
      } catch (error) {
        console.error('Gagal memuat data:', error);
        alert('Data tidak ditemukan.');
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/tarif-objek-retribusi/${id}`, form);
      alert('Data berhasil diperbarui.');
      navigate('/tarif');
    } catch (error) {
      console.error('Gagal memperbarui data:', error);
      alert('Terjadi kesalahan saat memperbarui data.');
    }
  };

  return (
    <div>
      <h2>Edit Tarif Objek Retribusi</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="idObjekRetribusi" value={form.idObjekRetribusi} onChange={handleChange} required />
        <input type="text" name="idJenisJangkaWaktu" value={form.idJenisJangkaWaktu} onChange={handleChange} required />
        <input type="date" name="tanggalDinilai" value={form.tanggalDinilai} onChange={handleChange} required />
        <input type="text" name="namaPenilai" value={form.namaPenilai} onChange={handleChange} required />
        <input type="number" name="nominalTarif" value={form.nominalTarif} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default TarifObjekRetribusiFormEdit;
