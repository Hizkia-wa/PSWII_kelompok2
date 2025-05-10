import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DaftarJenisJangkaWaktu = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get("http://localhost:8000/api/jenis-jangka-waktu").then((res) => {
      setData(res.data.data); // pakai .data karena response-nya pakai API Resource
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios.delete(`http://localhost:8000/api/jenis-jangka-waktu/${id}`).then(() => {
        alert("Data berhasil dihapus");
        getData();
      });
    }
  };

  return (
    <div>
      <h2>Daftar Jenis Jangka Waktu</h2>
      <Link to="/JenisJangkaWaktu/tambah">➕ Tambah Baru</Link>
      <ul>
        {data.length === 0 ? (
          <li>Belum ada data</li>
        ) : (
          data.map((item) => (
            <li key={item.idJenisJangkaWaktu}>
              <strong>{item.jenisJangkaWaktu}</strong> – {item.keterangan}
              &nbsp;
              <Link to={`/JenisJangkaWaktu/edit/${item.idJenisJangkaWaktu}`}>✏️ Edit</Link>
              &nbsp;
              <button onClick={() => handleDelete(item.idJenisJangkaWaktu)}>🗑️ Hapus</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default DaftarJenisJangkaWaktu;
