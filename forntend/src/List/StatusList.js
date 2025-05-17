import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function StatusList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{
            fontSize: '20px',
            color: '#222',
            margin: 0,
            borderLeft: '4px solid #1a237e',
            paddingLeft: '10px'
          }}>
            Daftar Jenis Status
          </h2>
          <button
            onClick={() => navigate('/status/tambah')}
            style={{
              backgroundColor: '#3f51b5',
              color: 'white',
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

        <table
          border="1"
          cellPadding="8"
          style={{
            width: '100%',
            marginTop: '20px',
            borderCollapse: 'collapse',
            textAlign: 'left',
          }}
        >
          <thead style={{ backgroundColor: '#f5f5f5' }}>
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
                  <button
                    onClick={() => navigate(`/status/edit/${status.idStatus}`)}
                    style={{
                      backgroundColor: '#ff9800',
                      color: 'white',
                      border: 'none',
                      padding: '6px 10px',
                      marginRight: '5px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => navigate(`/status/${status.idStatus}`)}
                    style={{
                      backgroundColor: '#03a9f4',
                      color: 'white',
                      border: 'none',
                      padding: '6px 10px',
                      marginRight: '5px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    👁️
                  </button>
                  <button
                    onClick={() => handleDelete(status.idStatus)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: 'right', marginTop: '10px', color: '#555', fontSize: '14px' }}>
          Menampilkan {data.length} dari {data.length} data
        </div>
      </div>
    </div>
  );
}

export default StatusList;
