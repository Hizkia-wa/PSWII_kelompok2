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
    <div>
      <h2>Daftar Wajib Retribusi</h2>
      <button onClick={() => setShowAddForm(true)}>Tambah</button>

      {showAddForm && <WajibRetribusiAdd onClose={() => { setShowAddForm(false); fetchData(); }} />}
      {editItem && <WajibRetribusiEdit data={editItem} onClose={() => { setEditItem(null); fetchData(); }} />}

      <table>
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
              <td>
                <button onClick={() => setEditItem(item)}>Edit</button>
                <button onClick={() => handleDelete(item.idWajibRetribusi)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WajibRetribusiList;
