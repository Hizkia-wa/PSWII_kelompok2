import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PermohonanSewaList = () => {
  const [permohonans, setPermohonans] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:8000/api/permohonan-sewa');
    setPermohonans(res.data.data);
  };

  return (
    <div>
      <h2>Daftar Permohonan Sewa</h2>
      <Link to="/permohonansewa/add">+ Tambah Data</Link>
      <ul>
        {permohonans.map((item) => (
          <li key={item.idPermohonanSewa}>
            {item.namaPemohon} - {item.nomorSuratPermohonan}
            <Link to={`/permohonansewa/edit/${item.idPermohonanSewa}`}> ✏️ Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermohonanSewaList;
