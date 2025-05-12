import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PermohonanSewaFormAdd = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    idJenisPermohonan: '',
    nomorSuratPermohonan: '',
    tanggalPengajuan: '',
    namaPemohon: '',
    alamatPemohon: '',
    idTarifObjekRetribusi: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/permohonan-sewa', form);
    navigate('/permohonansewa');
  };

  return (
    <div>
      <h2>Tambah Permohonan Sewa</h2>
      <form onSubmit={handleSubmit}>
        <input name="idJenisPermohonan" placeholder="ID Jenis Permohonan" onChange={handleChange} />
        <input name="nomorSuratPermohonan" placeholder="Nomor Surat" onChange={handleChange} />
        <input type="date" name="tanggalPengajuan" onChange={handleChange} />
        <input name="namaPemohon" placeholder="Nama Pemohon" onChange={handleChange} />
        <textarea name="alamatPemohon" placeholder="Alamat" onChange={handleChange}></textarea>
        <input name="idTarifObjekRetribusi" placeholder="ID Tarif Objek" onChange={handleChange} />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default PermohonanSewaFormAdd;
