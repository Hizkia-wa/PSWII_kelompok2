import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-permohonan"; // Pastikan URL ini benar

const CreatePostForm = () => {
  const [form, setForm] = useState({ jenisPermohonan: "", parentId: "", keterangan: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors before sending request
    setErrors({});

    // Mengirimkan data ke API menggunakan axios
    axios
      .post(API, form)
      .then((response) => {
        console.log(response.data); // Bisa cek respons API
        navigate("/"); // Redirect ke halaman list setelah berhasil tambah data
      })
      .catch((error) => {
        // Menangani error jika terjadi kesalahan pada API
        if (error.response && error.response.data.errors) {
          // Menangani kesalahan validasi dan menampilkannya
          setErrors(error.response.data.errors);
        } else {
          console.error("Gagal menambahkan data:", error);
          alert("Terjadi kesalahan saat menyimpan data.");
        }
      });
  };

  return (
    <div>
      <h2>Tambah Jenis Permohonan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Jenis Permohonan</label>
          <input
            type="text"
            name="jenisPermohonan"
            value={form.jenisPermohonan}
            onChange={handleChange}
            required
          />
          {errors.jenisPermohonan && <p>{errors.jenisPermohonan[0]}</p>}
        </div>
        <div>
          <label>Parent ID</label>
          <input
            type="number"
            name="parentId"
            value={form.parentId}
            onChange={handleChange}
          />
          {errors.parentId && <p>{errors.parentId[0]}</p>}
        </div>
        <div>
          <label>Keterangan</label>
          <textarea
            name="keterangan"
            value={form.keterangan}
            onChange={handleChange}
            required
          />
          {errors.keterangan && <p>{errors.keterangan[0]}</p>}
        </div>
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
