import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StatusList({ onEdit }) {
  const [data, setData] = useState([]);

  const fetchStatus = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/status');
      setData(res.data.data);
    } catch (error) {
      console.error('Gagal mengambil data status:', error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`http://localhost:8000/api/status/${id}`);
        fetchStatus();
      } catch (error) {
        console.error('Gagal menghapus status:', error);
      }
    }
  };

  return (
    <div>
      <h2>Daftar Status</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Status</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((status) => (
            <tr key={status.idStatus}>
              <td>{status.idStatus}</td>
              <td>{status.namaStatus}</td>
              <td>{status.keterangan}</td>
              <td>
                <button onClick={() => onEdit(status.idStatus)}>Edit</button>
                <button onClick={() => handleDelete(status.idStatus)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatusList;
