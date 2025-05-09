// src/pages/UserFormAdd.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:8000/api/users";

const UserFormAdd = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    token: "",
    keterangan: "",
    status: "Aktif",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      isDeleted: form.status === "Nonaktif" ? true : false,
    };

    axios.post(API, payload).then(() => navigate("/user"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah User</h2>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="token" value={form.token} onChange={handleChange} placeholder="Token" />
      <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Aktif">Aktif</option>
        <option value="Nonaktif">Nonaktif</option>
      </select>
      <input name="keterangan" value={form.keterangan} onChange={handleChange} placeholder="Keterangan" />
      <button type="submit">Simpan</button>
    </form>
  );
};

export default UserFormAdd;
