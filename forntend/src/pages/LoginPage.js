import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Component with embedded CSS
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Email atau password salah');
    }
  };

  return (
    <>
      {/* Embedded CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

          :root {
            --primary: #1E88E5;
            --primary-light: #64B5F6;
            --primary-dark: #0D47A1;
            --white: #ffffff;
            --light-gray: #f5f7fa;
            --gray: #a0a0a0;
            --dark-gray: #505050;
            --shadow: rgba(0, 0, 0, 0.1);
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
          }

          body {
            background-color: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
          }

          body::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 300px;
            height: 300px;
            background-color: var(--primary-light);
            border-radius: 50%;
            transform: translate(50%, -50%);
            opacity: 0.3;
            z-index: -1;
          }

          body::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 400px;
            height: 400px;
            background-color: var(--primary);
            border-radius: 50%;
            transform: translate(-50%, 50%);
            opacity: 0.2;
            z-index: -1;
          }

          .login-container {
            background-color: var(--white);
            border-radius: 24px;
            box-shadow: 0 10px 30px var(--shadow);
            width: 380px;
            max-width: 90%;
            padding: 40px 30px;
            text-align: center;
            position: relative;
            z-index: 1;
            margin: 60px auto;
          }

          .login-header {
            margin-bottom: 40px;
          }

          .login-header h2 {
            color: var(--primary-dark);
            font-weight: 600;
            font-size: 24px;
            margin-bottom: 8px;
          }

          .login-header p {
            color: var(--gray);
            font-size: 14px;
          }

          .login-illustration {
            max-width: 180px;
            margin: 0 auto 30px;
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .login-form input {
            width: 100%;
            background-color: var(--light-gray);
            border: none;
            border-radius: 10px;
            padding: 15px 20px;
            margin-bottom: 16px;
            font-size: 14px;
            color: var(--dark-gray);
            outline: none;
            transition: all 0.3s ease;
          }

          .login-form input:focus {
            box-shadow: 0 0 0 2px var(--primary-light);
          }

          .login-form input::placeholder {
            color: var(--gray);
          }

          .login-form button {
            width: 100%;
            background-color: var(--primary);
            color: var(--white);
            border: none;
            border-radius: 10px;
            padding: 15px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 8px;
          }

          .login-form button:hover {
            background-color: var(--primary-dark);
          }

          .error-message {
            color: #e53935;
            font-size: 14px;
            margin-top: 12px;
          }

          .login-footer {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            gap: 30px;
          }

          .footer-icon {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: var(--gray);
            text-decoration: none;
            font-size: 12px;
          }

          .icon-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--light-gray);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 5px;
            transition: all 0.3s ease;
          }

          .footer-icon:hover .icon-circle {
            background-color: var(--primary-light);
            color: var(--white);
          }

          .isometric-decoration {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
            overflow: hidden;
            opacity: 0.5;
          }

          .iso-element {
            position: absolute;
          }

          .iso-element-1 {
            width: 80px;
            height: 80px;
            background-color: var(--primary-light);
            transform: rotate(45deg);
            top: -20px;
            right: -20px;
            opacity: 0.6;
          }

          .iso-element-2 {
            width: 60px;
            height: 60px;
            background-color: var(--primary);
            transform: rotate(30deg);
            bottom: -15px;
            left: 30px;
            opacity: 0.4;
          }
        `}
      </style>

      {/* Component JSX */}
      <div className="login-container">
        <div className="isometric-decoration">
          <div className="iso-element iso-element-1"></div>
          <div className="iso-element iso-element-2"></div>
        </div>
        
        <div className="login-header">
          <h2>Login Admin</h2>
          <p>Masukkan kredensial anda untuk login</p>
        </div>
        
        <div className="login-illustration">
          <svg width="120" height="120" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="#e6f4ff" />
            <rect x="70" y="60" width="60" height="80" rx="4" fill="#1E88E5" />
            <rect x="80" y="75" width="40" height="8" rx="2" fill="white" />
            <rect x="80" y="95" width="40" height="8" rx="2" fill="white" />
            <rect x="80" y="115" width="20" height="8" rx="2" fill="white" />
            <circle cx="140" cy="70" r="15" fill="#64B5F6" />
            <path d="M135,70 L140,75 L145,65" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
        
        <form className="login-form" onSubmit={handleLogin}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
          
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
          
          <button type="submit">Login</button>
          
          {error && <p className="error-message">{error}</p>}
        </form>
        
       
      </div>
    </>
  );
};

export default LoginPage;