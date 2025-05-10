import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JangkaWaktuSewaList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:8000/api/jangka-waktu-sewa')
      .then(res => {
        setData(res.data.data); // pastikan struktur respons sesuai
      })
      .catch(err => {
        console.error('Gagal mengambil data:', err);
        alert('Gagal memuat data.');
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      axios
        .delete(`http://localhost:8000/api/jangka-waktu-sewa/${id}`)
        .then(() => {
          alert('Data berhasil dihapus!');
          fetchData();
        })
        .catch(err => {
          console.error('Gagal menghapus data:', err);
          alert('Gagal menghapus. Cek console.');
        });
    }
  };

  return (
    <div>
      <h2>Daftar Jangka Waktu Sewa</h2>
      <Link to="/JangkaWaktuSewa/tambah">
        <button>Tambah Jangka Waktu Sewa</button>
      </Link>

      <table border="1" cellPadding="8" style={{ marginTop: '1em', width: '100%' }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Jangka Waktu</th>
            <th>Keterangan</th>
            <th>Default</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.idJangkaWaktuSewa}>
                <td>{index + 1}</td>
                <td>{item.jangkaWaktuSewa}</td>
                <td>{item.keterangan || '-'}</td>
                <td>{item.isDefault ? 'Ya' : 'Tidak'}</td>
                <td>
                  <Link to={`/JangkaWaktuSewa/edit/${item.idJangkaWaktuSewa}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(item.idJangkaWaktuSewa)}>Hapus</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" align="center">Tidak ada data.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JangkaWaktuSewaList;
