import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Gunakan dari .env jika ada, fallback ke default localhost:8000
const API = "http://localhost:8000/api/jenis-permohonan";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data jenisPermohonan dari API
  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        console.log(res.data); // Memeriksa struktur data API
        setPosts(res.data.data); // Mengakses data dari properti 'data'
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
        alert("Gagal mengambil data dari server. Pastikan API Laravel berjalan.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      axios
        .delete(`${API}/${id}`)
        .then(() => {
          setPosts(posts.filter((post) => post.id !== id)); // Gunakan id yang benar
        })
        .catch((error) => {
          console.error("Gagal menghapus data:", error);
          alert("Terjadi kesalahan saat menghapus data.");
        });
    }
  };

  if (loading) return <p>Memuat data...</p>;

  return (
    <div>
      <h2>Daftar Jenis Permohonan</h2>
      <Link to="/create">➕ Tambah Jenis Permohonan</Link>
      {posts.length === 0 ? (
        <p>Belum ada data.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.jenisPermohonan}</strong> &nbsp;
              <Link to={`/edit/${post.id}`}>✏️ Edit</Link> &nbsp;
              <button onClick={() => handleDelete(post.id)}>🗑️ Hapus</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
