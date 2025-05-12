// src/pages/TarifObjekRetribusi/TarifAdd.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TarifObjekRetribusiFormAdd = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    idObjekRetribusi: '',
    idJenisJangkaWaktu: '',
    tanggalDinilai: '',
    namaPenilai: '',
    nominalTarif: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/tarif-objek-retribusi', form);
      alert('Data berhasil ditambahkan.');
      navigate('/tarif');
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <div>
      <h2>Tambah Tarif Objek Retribusi</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="idObjekRetribusi" placeholder="ID Objek Retribusi" onChange={handleChange} required />
        <input type="text" name="idJenisJangkaWaktu" placeholder="ID Jangka Waktu" onChange={handleChange} required />
        <input type="date" name="tanggalDinilai" onChange={handleChange} required />
        <input type="text" name="namaPenilai" placeholder="Nama Penilai" onChange={handleChange} required />
        <input type="number" name="nominalTarif" placeholder="Nominal Tarif" onChange={handleChange} required />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default TarifObjekRetribusiFormAdd;
