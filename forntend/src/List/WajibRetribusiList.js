import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WajibRetribusiList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/wajib-retribusi');
      setData(res.data.data);
    } catch (error) {
      console.error('Gagal mengambil data wajib retribusi:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Yakin ingin menghapus data ini?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/api/wajib-retribusi/${id}`);
      alert('Data berhasil dihapus');
      fetchData(); // Refresh data setelah delete
    } catch (error) {
      alert('Gagal menghapus data');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="title-container">
          <div className="title-bar"></div>
          <h2 className="title">Daftar Wajib Retribusi</h2>
        </div>
        <button 
          className="btn-tambah"
          onClick={() => navigate('/wajibretribusi/tambah')}
        >
          + Tambah Data
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>NIK</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.idWajibRetribusi}>
                <td>{item.NIK}</td>
                <td>{item.namaWajibRetribusi}</td>
                <td>{item.alamat}</td>
                <td className="action-buttons">
                  <button 
                    className="btn-detail"
                    onClick={() => navigate(`/wajibretribusi/show/${item.idWajibRetribusi}`)}
                  >
                    Detail
                  </button>
                  <button 
                    className="btn-edit"
                    onClick={() => navigate(`/wajibretribusi/edit/${item.idWajibRetribusi}`)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-hapus"
                    onClick={() => handleDelete(item.idWajibRetribusi)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-info">
        Menampilkan {data.length} dari {data.length} data
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .title-container {
          display: flex;
          align-items: center;
        }
        
        .title-bar {
          width: 5px;
          height: 30px;
          background-color: #2a3c85;
          margin-right: 10px;
        }
        
        .title {
          font-size: 1.5rem;
          margin: 0;
          color: #333;
        }
        
        .btn-tambah {
          background-color: #2a3c85;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .table-container {
          background-color: white;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .data-table th {
          background-color: #2a3c85;
          color: white;
          text-align: left;
          padding: 12px 15px;
        }
        
        .data-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #eee;
        }
        
        .data-table tr:last-child td {
          border-bottom: none;
        }
        
        .action-buttons {
          display: flex;
          gap: 5px;
        }
        
        .btn-detail {
          background-color: #2196F3;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          cursor: pointer;
        }
        
        .btn-edit {
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          cursor: pointer;
        }
        
        .btn-hapus {
          background-color: #F44336;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          cursor: pointer;
        }
        
        .pagination-info {
          margin-top: 15px;
          text-align: right;
          color: #666;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}

export default WajibRetribusiList;