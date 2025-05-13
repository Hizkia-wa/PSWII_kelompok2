import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API = "http://localhost:8000/api/lokasi-objek-retribusi";

const LokasiObjekRetribusiList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .get(API)
      .then((res) => {
        setData(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios
        .delete(`${API}/${id}`)
        .then(() => {
          setData(data.filter((item) => item.idLokasiObjekRetribusi !== id));
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
      

        {/* Konten Utama */}
        <div className="col-md-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Data Lokasi Objek Retribusi</h3>
            <Link to="/lokasiobjekretribusi/add" className="btn btn-primary">
              ➕ Tambah Data
            </Link>
          </div>

          {loading ? (
            <p>Memuat data...</p>
          ) : data.length === 0 ? (
            <p>Belum ada data.</p>
          ) : (
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Lokasi</th>
                  <th>Keterangan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.idLokasiObjekRetribusi}>
                    <td>{index + 1}</td>
                    <td>{item.lokasiObjekRetribusi}</td>
                    <td>{item.keterangan || '-'}</td>
                    <td>
                      <Link
                        to={`/lokasiobjekretribusi/show/${item.idLokasiObjekRetribusi}`}
                        className="btn btn-info btn-sm me-2"
                      >
                        👁️
                      </Link>
                      <Link
                        to={`/lokasiobjekretribusi/edit/${item.idLokasiObjekRetribusi}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(item.idLokasiObjekRetribusi)}
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

export default LokasiObjekRetribusiList;
