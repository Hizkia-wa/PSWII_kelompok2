import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-status";

const ListJenisStatus = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get(API)
      .then((res) => setData(res.data.data))
      .catch((err) => console.error("Gagal mengambil data:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios
        .delete(`${API}/${id}`)
        .then(() => fetchData())
        .catch((err) => console.error("Gagal menghapus:", err));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Daftar Jenis Status</h2>
      <Link to="/add-jenis-status">Tambah Data</Link>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Jenis Status</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.idJenisStatus}>
              <td>{item.idJenisStatus}</td>
              <td>{item.jenisStatus}</td>
              <td>{item.keterangan}</td>
              <td>
                <Link to={`/edit-jenis-status/${item.idJenisStatus}`}>Edit</Link> |{" "}
                <button onClick={() => handleDelete(item.idJenisStatus)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListJenisStatus;
