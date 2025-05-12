import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PeruntukanSewaFormAdd() {
  const [jenisKegiatan, setJenisKegiatan] = useState('');
  const [peruntukanSewa, setPeruntukanSewa] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/peruntukan-sewa', {
        jenisKegiatan,
        peruntukanSewa,
        keterangan
      });
      alert('Berhasil menambahkan data!');
      navigate('/peruntukan-sewa');
    } catch (err) {
      console.error('Gagal menambahkan data:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Peruntukan Sewa</h2>
      <input
        type="text"
        placeholder="Jenis Kegiatan"
        value={jenisKegiatan}
        onChange={(e) => setJenisKegiatan(e.target.value)}
        required
      />
      <br />
      <input
        type="text"
        placeholder="Peruntukan Sewa"
        value={peruntukanSewa}
        onChange={(e) => setPeruntukanSewa(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Keterangan"
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
      />
      <br />
      <button type="submit">Simpan</button>
    </form>
  );
}

export default PeruntukanSewaFormAdd;
