import React, { useState } from 'react';
import axios from 'axios';

const WajibRetribusiFormEdit = ({ data, onClose }) => {
  const [form, setForm] = useState({ ...data });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/wajib-retribusi/${form.idWajibRetribusi}`, form);
      alert("Data berhasil diperbarui.");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui data.");
    }
  };

  return (
    <div>
      <h3>Edit Wajib Retribusi</h3>
      <form onSubmit={handleSubmit}>
        <input name="NIK" placeholder="NIK" value={form.NIK} onChange={handleChange} required />
        <input name="namaWajibRetribusi" placeholder="Nama" value={form.namaWajibRetribusi} onChange={handleChange} required />
        <input name="pekerjaan" placeholder="Pekerjaan" value={form.pekerjaan} onChange={handleChange} required />
        <textarea name="alamat" placeholder="Alamat" value={form.alamat} onChange={handleChange} required />
        <input name="nomorPonsel" placeholder="Nomor Ponsel" value={form.nomorPonsel} onChange={handleChange} />
        <input name="nomorWhatsapp" placeholder="Nomor WhatsApp" value={form.nomorWhatsapp} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="idJenisRetribusi" placeholder="ID Jenis Retribusi" value={form.idJenisRetribusi} onChange={handleChange} />
        <input name="fileFoto" placeholder="Link Foto" value={form.fileFoto} onChange={handleChange} />
        <button type="submit">Simpan</button>
        <button type="button" onClick={onClose}>Batal</button>
      </form>
    </div>
  );
};

export default WajibRetribusiFormEdit;
