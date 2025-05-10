import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FormEditJenisJangkaWaktu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jenisJangkaWaktu, setJenisJangkaWaktu] = useState("");
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/api/jenis-jangka-waktu/${id}`).then((res) => {
      setJenisJangkaWaktu(res.data.jenisJangkaWaktu);
      setKeterangan(res.data.keterangan || "");
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/jenis-jangka-waktu/${id}`, {
        jenisJangkaWaktu,
        keterangan,
      })
      .then(() => {
        alert("Data berhasil diupdate");
        navigate("/JenisJangkaWaktu");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Jenis Jangka Waktu</h2>
      <input
        type="text"
        value={jenisJangkaWaktu}
        onChange={(e) => setJenisJangkaWaktu(e.target.value)}
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
};

export default FormEditJenisJangkaWaktu;
