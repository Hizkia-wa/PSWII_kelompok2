import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const JangkaWaktuSewaFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idJenisJangkaWaktu: '',
    jangkaWaktuSewa: '',
    keterangan: '',
    isDefault: false
  });

  const [jenisList, setJenisList] = useState([]);

  useEffect(() => {

    axios
      .get(`http://localhost:8000/api/jangka-waktu-sewa/${id}`)
      .then(res => {
        setFormData(res.data.data); // sesuaikan struktur respons
      })
      .catch(err => {
        console.error('Gagal mengambil data jangka waktu:', err);
      });

    // Ambil daftar jenis jangka waktu
    axios
      .get('http://localhost:8000/api/jenis-jangka-waktu')
      .then(res => {
        setJenisList(res.data.data);
      })
      .catch(err => {
        console.error('Gagal mengambil data jenis jangka waktu:', err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/jangka-waktu-sewa/${id}`, formData)
      .then(() => {
        alert('Data berhasil diperbarui!');
        navigate('/jangka-waktu-sewa');
      })
      .catch(err => {
        console.error('Gagal memperbarui data:', err);
        alert('Gagal update. Silakan cek console.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Jangka Waktu Sewa</h2>

      <label>
        Jenis Jangka Waktu:
        <select
          value={formData.idJenisJangkaWaktu}
          onChange={(e) =>
            setFormData({ ...formData, idJenisJangkaWaktu: e.target.value })
          }
          required
        >
          <option value="">Pilih Jenis Jangka Waktu</option>
          {jenisList.map(jenis => (
            <option
              key={jenis.idJenisJangkaWaktu}
              value={jenis.idJenisJangkaWaktu}
            >
              {jenis.jenisJangkaWaktu}
            </option>
          ))}
        </select>
      </label>

      <label>
        Jangka Waktu Sewa:
        <input
          type="text"
          value={formData.jangkaWaktuSewa}
          onChange={(e) =>
            setFormData({ ...formData, jangkaWaktuSewa: e.target.value })
          }
          required
        />
      </label>

      <label>
        Keterangan:
        <textarea
          value={formData.keterangan}
          onChange={(e) =>
            setFormData({ ...formData, keterangan: e.target.value })
          }
        />
      </label>

      <label>
        Default? 
        <input
          type="checkbox"
          checked={formData.isDefault}
          onChange={(e) =>
            setFormData({ ...formData, isDefault: e.target.checked })
          }
        />
      </label>

      <button type="submit">Update</button>
    </form>
  );
};

export default JangkaWaktuSewaFormEdit;
