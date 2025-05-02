import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import "./Login.css"; 
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      setError("Username dan password harus diisi.");
      return;
    }

    try {
      setLoading(true);
      const res = await login(form);

      if (res.status === "success") {
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      } else {
        setError(res.message || "Login gagal");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login. Pastikan API berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
      </div>
      <div className="login-right">
        <div className="logo-text">TapaTupa</div>
        <div className="slogan">
          Platform penyedia layanan gratis untuk masyarakat Toba
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <h2>Masuk Ke Akun Anda</h2>

          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

          <label>Email</label>
          <input
            type="text"
            placeholder="Masukkan Email Anda"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Masukkan Password Anda"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit" disabled={loading}>
            <FaArrowRightToBracket />
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
