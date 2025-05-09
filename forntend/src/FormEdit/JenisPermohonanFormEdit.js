import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-permohonan";

const EditPostForm = () => {
  const [form, setForm] = useState({
    jenisPermohonan: "",
    parentId: "",
    keterangan: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Ambil data jenisPermohonan berdasarkan ID
  useEffect(() => {
    if (id) {
      axios
        .get(`${API}/${id}`)
        .then((res) => {
          setForm({
            jenisPermohonan: res.data.jenisPermohonan || "",
            parentId: res.data.parentId || "",
            keterangan: res.data.keterangan || "",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Gagal memuat data:", error);
          alert("Data tidak ditemukan atau gagal diambil dari server.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API}/${id}`, form)
      .then(() => {
        alert("Data berhasil diperbarui.");
        navigate("/");
      })
      .catch((error) => {
        console.error("Gagal update data:", error);
        alert("Terjadi kesalahan saat menyimpan data.");
      });
  };

  if (loading) return <p>Memuat data...</p>;

  return (
    <div>
      <h2>Edit Jenis Permohonan</h2>
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
        </div>
        <div>
          <label>Parent ID (optional)</label>
          <input
            type="number"
            name="parentId"
            value={form.parentId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Keterangan</label>
          <textarea
            name="keterangan"
            value={form.keterangan}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPostForm;
