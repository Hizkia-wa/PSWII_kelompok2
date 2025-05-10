import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API = "http://localhost:8000/api/jenis-permohonan";

const JenisPermohonanList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        setPosts(res.data.data || []); // fallback array kosong kalau tidak ada data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios
        .delete(`${API}/${id}`)
        .then(() => {
          setPosts(posts.filter((item) => item.id !== id));
        })
        .catch((err) => {
          console.error("Gagal hapus:", err);
          alert("Terjadi kesalahan saat menghapus data.");
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white min-vh-100 p-3">
          <h4 className="text-center">TobaLink</h4>
          <hr />
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/JenisPermohonan"
                className="nav-link text-white fw-bold"
              >
                Jenis Permohonan
              </Link>
            </li>
            {/* Tambah menu lain di sini */}
          </ul>
        </div>

        {/* Konten Utama */}
        <div className="col-md-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Data Jenis Permohonan</h3>
            <Link to="JenisPermohonan/create" className="btn btn-primary">
              ➕ Tambah Data
            </Link>
          </div>

          {loading ? (
            <p>Memuat data...</p>
          ) : posts.length === 0 ? (
            <p>Belum ada data.</p>
          ) : (
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Jenis Permohonan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.jenisPermohonan}</td>
                    <td>
                      <Link
                        to={`/show/${item.id}`}
                        className="btn btn-info btn-sm me-2"
                      >
                        👁️
                      </Link>
                      <Link
                        to={`JenisPermohonan/edit/${item.id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-danger btn-sm"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default JenisPermohonanList;
