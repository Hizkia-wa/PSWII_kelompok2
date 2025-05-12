import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-status";

const AddJenisStatus = () => {
  const [form, setForm] = useState({ jenisStatus: "Proses", keterangan: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API, form)
      .then(() => {
        alert("Data berhasil ditambahkan.");
        navigate("/");
      })
      .catch((err) => {
        console.error("Gagal menambahkan:", err);
        alert("Terjadi kesalahan saat menambahkan data.");
      });
  };

  return (
    <div>
      <h2>Tambah Jenis Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Jenis Status</label>
          <select name="jenisStatus" value={form.jenisStatus} onChange={handleChange}>
            <option value="Proses">Proses</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
        </div>
        <div>
          <label>Keterangan</label>
          <textarea name="keterangan" value={form.keterangan} onChange={handleChange} />
        </div>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default AddJenisStatus;
