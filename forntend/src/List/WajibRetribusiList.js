import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WajibRetribusiEdit from '../FormEdit/WajibRetribusiFormEdit';
import WajibRetribusiAdd from '../FormAdd/WajibRetribusiFormAdd';

const WajibRetribusiList = () => {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/wajib-retribusi');
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`http://localhost:8000/api/wajib-retribusi/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h2>Daftar Wajib Retribusi</h2>
        <button className="btn-add" onClick={() => setShowAddForm(true)}>
          <span className="plus-icon">+</span> Tambah Data
        </button>
      </div>

      {showAddForm && <WajibRetribusiAdd onClose={() => { setShowAddForm(false); fetchData(); }} />}
      {editItem && <WajibRetribusiEdit data={editItem} onClose={() => { setEditItem(null); fetchData(); }} />}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>NIK</th>
              <th>Nama</th>
              <th>Pekerjaan</th>
              <th>Alamat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.idWajibRetribusi}>
                <td>{item.NIK}</td>
                <td>{item.namaWajibRetribusi}</td>
                <td>{item.pekerjaan}</td>
                <td>{item.alamat}</td>
                <td className="action-buttons">
                  <button className="btn-edit" onClick={() => setEditItem(item)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(item.idWajibRetribusi)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <p>Menampilkan {data.length} dari {data.length} data</p>
        </div>
      </div>

      <style jsx>{`
        /* Global styles */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }

        .container {
          padding: 20px;
          background-color: #f5f5f5;
          min-height: 100vh;
        }

        /* Header styles */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-left: 30px;
          border-left: 5px solid #2a3c85;
        }

        .header h2 {
          color: #333;
          font-size: 24px;
          font-weight: bold;
        }

        /* Button styles */
        .btn-add {
          background-color: #2a3c85;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: background-color 0.3s;
        }

        .btn-add:hover {
          background-color: #1e2d6b;
        }

        .plus-icon {
          margin-right: 5px;
          font-weight: bold;
          font-size: 18px;
        }

        /* Table styles */
        .table-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          background-color: #f8f9fa;
          text-align: left;
          padding: 12px 15px;
          font-weight: bold;
          color: #555;
          border-bottom: 1px solid #dee2e6;
        }

        .data-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #e9ecef;
          color: #333;
        }

        .data-table tr:hover {
          background-color: #f8f9fa;
        }

        /* Action buttons */
        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .btn-edit {
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn-edit:hover {
          background-color: #45a049;
        }

        .btn-delete {
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn-delete:hover {
          background-color: #d32f2f;
        }

        /* Table footer */
        .table-footer {
          padding: 12px 15px;
          color: #777;
          font-size: 14px;
          text-align: right;
          border-top: 1px solid #e9ecef;
        }
      `}</style>
    </div>
  );
};

export default WajibRetribusiList;