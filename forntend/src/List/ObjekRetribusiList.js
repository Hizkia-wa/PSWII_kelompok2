import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListObjekRetribusi({ onEdit }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // Start loading
      setLoading(true);
      setError(null); // Clear any previous error
      const res = await axios.get('http://localhost:8000/api/objek-retribusi');
      setData(res.data.data);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
      setError('Gagal mengambil data');
    } finally {
      // Done loading
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`http://localhost:8000/api/objek-retribusi/${id}`);
        fetchData(); // Reload data after delete
      } catch (err) {
        console.error('Gagal menghapus data:', err);
        setError('Gagal menghapus data');
      }
    }
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
      <h3>Daftar Objek Retribusi</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>No Bangunan</th>
            <th>Alamat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.kodeObjekRetribusi}</td>
              <td>{item.objekRetribusi}</td>
              <td>{item.noBangunan}</td>
              <td>{item.alamat}</td>
              <td>
                <button onClick={() => onEdit(item.id)}>Edit</button>{' '}
                <button onClick={() => handleDelete(item.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListObjekRetribusi;
