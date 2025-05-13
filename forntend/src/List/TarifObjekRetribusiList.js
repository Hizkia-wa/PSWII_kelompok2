import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TarifObjekRetribusiList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTarif = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tarif-objek-retribusi');
        setData(response.data.data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };
    fetchTarif();
  }, []);

  return (
    <>
      <style>{`
        .tarif-container {
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: 5px;
          width: 100%;
          box-sizing: border-box;
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .header-title {
          display: flex;
          align-items: center;
        }

        .blue-bar {
          width: 4px;
          height: 32px;
          background-color: #4054b2;
          margin-right: 15px;
          border-radius: 2px;
        }

        .header-title h2 {
          color: #333;
          font-size: 24px;
          margin: 0;
        }

        .add-button {
          background-color: #4054b2;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          display: flex;
          align-items: center;
          transition: background-color 0.3s;
        }

        .add-button:hover {
          background-color: #34439e;
        }

        .plus-icon {
          margin-right: 5px;
          font-weight: bold;
        }

        .table-container {
          background-color: white;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .tarif-table {
          width: 100%;
          border-collapse: collapse;
        }

        .tarif-table th {
          background-color: #f8f9fa;
          color: #666;
          text-align: left;
          padding: 15px;
          border-bottom: 1px solid #e0e0e0;
          font-weight: 600;
        }

        .tarif-table td {
          padding: 15px;
          border-bottom: 1px solid #e0e0e0;
          color: #333;
        }

        .tarif-table tr:last-child td {
          border-bottom: none;
        }

        .tarif-table tr:hover {
          background-color: #f9f9f9;
        }

        .column-narrow {
          width: 50px;
        }

        .column-actions {
          width: 120px;
          text-align: center;
        }

        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .edit-button {
          background-color: #ffa000;
          color: white;
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .delete-button {
          background-color: #f44336;
          color: white;
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pencil-icon, .trash-icon {
          font-size: 16px;
        }

        .pagination-info {
          padding: 15px;
          color: #666;
          text-align: right;
          border-top: 1px solid #e0e0e0;
          font-size: 14px;
        }

        .no-data {
          text-align: center;
          color: #666;
          padding: 30px 0;
        }
      `}</style>
      <div className="tarif-container">
        <div className="header-container">
          <div className="header-title">
            <div className="blue-bar"></div>
            <h2>Daftar Tarif Objek Retribusi</h2>
          </div>
          <Link to="/tarifobjekretribusi/add" className="add-button">
            <span className="plus-icon">+</span> Tambah Tarif
          </Link>
        </div>

        <div className="table-container">
          <table className="tarif-table">
            <thead>
              <tr>
                <th className="column-narrow">#</th>
                <th>Objek Retribusi</th>
                <th>Penilai</th>
                <th>Nominal</th>
                <th>Tanggal Dinilai</th>
                <th className="column-actions">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, idx) => (
                  <tr key={item.idTarifObjekRetribusi}>
                    <td className="column-narrow">{idx + 1}</td>
                    <td>{item.idObjekRetribusi}</td>
                    <td>{item.namaPenilai}</td>
                    <td>{item.nominalTarif}</td>
                    <td>{item.tanggalDinilai}</td>
                    <td className="action-buttons">
                      <Link to={`/tarif/edit/${item.idTarifObjekRetribusi}`} className="edit-button">
                        <span className="pencil-icon">✎</span>
                      </Link>
                      <button className="delete-button">
                        <span className="trash-icon">🗑</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">Tidak ada data</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination-info">
            Menampilkan {data.length > 0 ? 1 : 0} dari {data.length} data
          </div>
        </div>
      </div>
    </>
  );
};

export default TarifObjekRetribusiList;