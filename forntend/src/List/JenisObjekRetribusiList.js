import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JenisObjekRetribusiList = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:8000/api/jenis-objek-retribusi")
      .then((res) => setData(res.data.data))
      .catch((err) => console.error("Gagal fetch data:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios.delete(`http://localhost:8000/api/jenis-objek-retribusi/${id}`)
        .then(() => fetchData())
        .catch((err) => alert("Gagal hapus data."));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Daftar Jenis Objek Retribusi</h2>
      <Link to="/jenisobjekretribusi/create" className="btn btn-primary mb-3">
        ➕ Tambah Data
      </Link>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Jenis Objek</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.idJenisObjekRetribusi}>
              <td>{i + 1}</td>
              <td>{item.jenisObjekRetribusi}</td>
              <td>{item.keterangan}</td>
              <td>
                <Link
                  to={`/jenisobjekretribusi/edit/${item.idJenisObjekRetribusi}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  ✏️ Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.idJenisObjekRetribusi)}
                >
                  🗑️ Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JenisObjekRetribusiList;
