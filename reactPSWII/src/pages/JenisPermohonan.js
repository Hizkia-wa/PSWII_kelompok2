import React, { useEffect, useState } from "react";
import {
  getJenisPermohonan,
  createJenisPermohonan,
  updateJenisPermohonan,
  deleteJenisPermohonan,
} from "../services/api";

function JenisPermohonan() {
  const [jenis, setJenis] = useState([]);
  const [formData, setFormData] = useState({ nama: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchJenis();
  }, []);

  const fetchJenis = async () => {
    try {
      const res = await getJenisPermohonan();
      setJenis(res.data); // sesuaikan dengan struktur response API kamu
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateJenisPermohonan(editId, formData);
      } else {
        await createJenisPermohonan(formData);
      }
      setFormData({ nama: "" });
      setEditId(null);
      fetchJenis();
    } catch (error) {
      console.error("Gagal simpan:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ nama: item.nama });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus?")) {
      try {
        await deleteJenisPermohonan(id);
        fetchJenis();
      } catch (error) {
        console.error("Gagal hapus:", error);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Jenis Permohonan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Jenis Permohonan"
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Update" : "Tambah"}</button>
      </form>

      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {jenis.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JenisPermohonan;
