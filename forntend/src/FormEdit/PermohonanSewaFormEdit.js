import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PermohonanSewaFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    idJenisPermohonan: '',
    nomorSuratPermohonan: '',
    tanggalPengajuan: '',
    namaPemohon: '',
    alamatPemohon: '',
    idTarifObjekRetribusi: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:8000/api/permohonan-sewa/${id}`);
    setForm(res.data.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/permohonan-sewa/${id}`, form);
    navigate('/permohonansewa');
  };

  return (
    <div>
      <h2>Edit Permohonan Sewa</h2>
      <form onSubmit={handleSubmit}>
        <input name="idJenisPermohonan" value={form.idJenisPermohonan} onChange={handleChange} />
        <input name="nomorSuratPermohonan" value={form.nomorSuratPermohonan} onChange={handleChange} />
        <input type="date" name="tanggalPengajuan" value={form.tanggalPengajuan} onChange={handleChange} />
        <input name="namaPemohon" value={form.namaPemohon} onChange={handleChange} />
        <textarea name="alamatPemohon" value={form.alamatPemohon} onChange={handleChange}></textarea>
        <input name="idTarifObjekRetribusi" value={form.idTarifObjekRetribusi} onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default PermohonanSewaFormEdit;
