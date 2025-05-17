import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-status";

const EditJenisStatus = () => {
  const [form, setForm] = useState({ jenisStatus: "", keterangan: "" });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/${id}`)
      .then((res) => {
        setForm({
          jenisStatus: res.data.jenisStatus || "Proses",
          keterangan: res.data.keterangan || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
        alert("Data tidak ditemukan.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API}/${id}`, form)
      .then(() => {
        alert("Data berhasil diupdate.");
        navigate("/jenisstatus");
      })
      .catch((err) => {
        console.error("Gagal update:", err);
        alert("Terjadi kesalahan saat update.");
      });
  };

  if (loading) return <p>Memuat data...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        maxWidth: "700px",
        margin: "auto"
      }}>
        <h2 style={{
          fontSize: "20px",
          marginBottom: "10px",
          borderLeft: "4px solid #3f51b5",
          paddingLeft: "10px",
          color: "#222"
        }}>
          Edit Jenis Status
        </h2>
        <p style={{ marginBottom: "20px", color: "#555" }}>
          Silakan ubah data di bawah ini untuk memperbarui jenis status.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "6px" }}>
              Jenis Status <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="jenisStatus"
              value={form.jenisStatus}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc"
              }}
            >
              <option value="Proses">Proses</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
            <small style={{ color: "#888" }}>
              Contoh: Proses, Disetujui, Ditolak, Dibatalkan
            </small>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "6px" }}>
              Keterangan
            </label>
            <textarea
              name="keterangan"
              value={form.keterangan}
              onChange={handleChange}
              placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
              style={{
                width: "100%",
                minHeight: "100px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                resize: "vertical"
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              💾 Simpan Data
            </button>
            <button
              type="button"
              onClick={() => navigate("/jenisstatus")}
              style={{
                backgroundColor: "#f1f1f1",
                color: "#333",
                border: "1px solid #ccc",
                padding: "10px 16px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ❌ Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJenisStatus;
