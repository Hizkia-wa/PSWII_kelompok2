import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function PeruntukanSewaFormEdit() {
  const { id } = useParams();
  const [jenisKegiatan, setJenisKegiatan] = useState('');
  const [peruntukanSewa, setPeruntukanSewa] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/peruntukan-sewa/${id}`);
        const data = res.data.data;
        setJenisKegiatan(data.jenisKegiatan);
        setPeruntukanSewa(data.peruntukanSewa);
        setKeterangan(data.keterangan || '');
      } catch (err) {
        console.error('Gagal mengambil data:', err);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/peruntukan-sewa/${id}`, {
        jenisKegiatan,
        peruntukanSewa,
        keterangan
      });
      alert('Berhasil mengupdate data!');
      navigate('/peruntukan-sewa');
    } catch (err) {
      console.error('Gagal mengupdate data:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Peruntukan Sewa</h2>
      <input
        type="text"
        value={jenisKegiatan}
        onChange={(e) => setJenisKegiatan(e.target.value)}
        required
      />
      <br />
      <input
        type="text"
        value={peruntukanSewa}
        onChange={(e) => setPeruntukanSewa(e.target.value)}
        required
      />
      <br />
      <textarea
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
      />
      <br />
      <button type="submit">Update</button>
    </form>
  );
}

export default PeruntukanSewaFormEdit;
