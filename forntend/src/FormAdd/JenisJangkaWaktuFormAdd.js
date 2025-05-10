import React, { useState } from "react";
import axios from "axios";

const FormTambahJenisJangkaWaktu = () => {
  const [jenisJangkaWaktu, setJenisJangkaWaktu] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/jenis-jangka-waktu", {
        jenisJangkaWaktu,
        keterangan,
      });
      alert("Data berhasil ditambahkan.");
      setJenisJangkaWaktu("");
      setKeterangan("");
    } catch (error) {
      console.error("Gagal menambahkan data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Jenis Jangka Waktu</h2>
      <input
        type="text"
        placeholder="Jenis Jangka Waktu"
        value={jenisJangkaWaktu}
        onChange={(e) => setJenisJangkaWaktu(e.target.value)}
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
};

export default FormTambahJenisJangkaWaktu;
