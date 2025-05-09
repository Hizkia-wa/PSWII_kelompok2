// src/pages/UserFormEdit.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:8000/api/users";

const UserFormEdit = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    token: "",
    keterangan: "",
    status: "Aktif",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/${id}`).then((res) => {
      const user = res.data.data;
      setForm({
        username: user.username,
        email: user.email,
        token: user.token || "",
        password: "",
        keterangan: user.keterangan || "",
        status: user.isDeleted ? "Nonaktif" : "Aktif",
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      isDeleted: form.status === "Nonaktif" ? true : false,
    };

    axios.put(`${API}/${id}`, payload).then(() => navigate("/user"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="token" value={form.token} onChange={handleChange} placeholder="Token" />
      <input name="password" value={form.password} onChange={handleChange} placeholder="Password (kosongkan jika tidak diubah)" type="password" />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Aktif">Aktif</option>
        <option value="Nonaktif">Nonaktif</option>
      </select>
      <input name="keterangan" value={form.keterangan} onChange={handleChange} placeholder="Keterangan" />
      <button type="submit">Update</button>
    </form>
  );
};

export default UserFormEdit;
