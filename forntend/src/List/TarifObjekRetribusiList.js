// src/pages/TarifObjekRetribusi/TarifList.js
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
    <div>
      <h2>Daftar Tarif Objek Retribusi</h2>
      <Link to="/tarifobjekretribusi/add">+ Tambah Tarif</Link>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>No</th>
            <th>Objek Retribusi</th>
            <th>Penilai</th>
            <th>Nominal</th>
            <th>Tanggal Dinilai</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.idTarifObjekRetribusi}>
              <td>{idx + 1}</td>
              <td>{item.idObjekRetribusi}</td>
              <td>{item.namaPenilai}</td>
              <td>{item.nominalTarif}</td>
              <td>{item.tanggalDinilai}</td>
              <td>
                <Link to={`/tarif/edit/${item.idTarifObjekRetribusi}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TarifObjekRetribusiList;
