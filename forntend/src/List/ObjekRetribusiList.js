import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListObjekRetribusi() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/objek-retribusi');
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
        await axios.delete(`http://localhost:8000/api/objek-retribusi/${id}`);
        fetchData();
      } catch (err) {
        console.error('Gagal menghapus data:', err);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        maxWidth: '1000px',
        margin: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            fontSize: '20px',
            borderLeft: '4px solid #3f51b5',
            paddingLeft: '10px',
            color: '#222',
            margin: 0
          }}>
            Daftar Objek Retribusi
          </h2>
          <button
            onClick={() => navigate('/objekretribusi/create')}
            style={{
              backgroundColor: '#3f51b5',
              color: '#fff',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            + Tambah Data
          </button>
        </div>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#fafafa'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'left' }}>
              <th style={thStyle}>Kode</th>
              <th style={thStyle}>Nama</th>
              <th style={thStyle}>No Bangunan</th>
              <th style={thStyle}>Alamat</th>
              <th style={thStyle}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={tdStyle}>{item.kodeObjekRetribusi}</td>
                <td style={tdStyle}>{item.objekRetribusi}</td>
                <td style={tdStyle}>{item.noBangunan}</td>
                <td style={tdStyle}>{item.alamat}</td>
                <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                  <button
                    onClick={() => navigate(`/objekretribusi/show/${item.id}`)}
                    style={buttonStyle("#2196f3")}
                    title="Lihat"
                  >
                    👁️
                  </button>{' '}
                  <button
                    onClick={() => navigate(`/objekretribusi/edit/${item.id}`)}
                    style={buttonStyle("#ff9800")}
                    title="Edit"
                  >
                    ✏️
                  </button>{' '}
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={buttonStyle("#f44336")}
                    title="Hapus"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '10px', textAlign: 'right', color: '#777' }}>
          Menampilkan {data.length} data
        </div>
      </div>
    </div>
  );
}

// Reusable styling
const thStyle = {
  padding: '12px',
  fontWeight: 'bold',
  borderBottom: '2px solid #ddd'
};

const tdStyle = {
  padding: '12px',
  verticalAlign: 'top',
};

const buttonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '6px 10px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '14px',
});

export default ListObjekRetribusi;
