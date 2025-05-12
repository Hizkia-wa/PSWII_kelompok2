import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PeruntukanSewaList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/peruntukan-sewa');
      setData(res.data.data);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`http://localhost:8000/api/peruntukan-sewa/${id}`);
        fetchData();
      } catch (err) {
        console.error('Gagal menghapus data:', err);
      }
    }
  };

  return (
    <div>
      <h2>Daftar Peruntukan Sewa</h2>
      <button onClick={() => navigate('/peruntukansewa/add')}>Tambah Data</button>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Jenis Kegiatan</th>
            <th>Peruntukan</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.idPeruntukanSewa}>
              <td>{item.jenisKegiatan}</td>
              <td>{item.peruntukanSewa}</td>
              <td>{item.keterangan}</td>
              <td>
                <button onClick={() => navigate(`/peruntukansewa/edit/${item.idPeruntukanSewa}`)}>Edit</button>
                <button onClick={() => handleDelete(item.idPeruntukanSewa)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PeruntukanSewaList;
