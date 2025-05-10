import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DaftarJenisJangkaWaktu = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get("http://localhost:8000/api/jenis-jangka-waktu").then((res) => {
      setData(res.data.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios
        .delete(`http://localhost:8000/api/jenis-jangka-waktu/${id}`)
        .then(() => {
          alert("Data berhasil dihapus");
          getData();
        });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Data Jenis Jangka Waktu</h4>
        <Link to="/JenisJangkaWaktu/tambah" className="btn btn-primary">
          ➕ Tambah Jenis
        </Link>
      </div>
      {data.length === 0 ? (
        <div className="alert alert-info">Belum ada data.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Jenis Jangka Waktu</th>
                <th>Keterangan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.idJenisJangkaWaktu}>
                  <td>{index + 1}</td>
                  <td>{item.jenisJangkaWaktu}</td>
                  <td>{item.keterangan}</td>
                  <td>
                    <Link
                      to={`/JenisJangkaWaktu/edit/${item.idJenisJangkaWaktu}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.idJenisJangkaWaktu)}
                    >
                      🗑️ Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DaftarJenisJangkaWaktu;
