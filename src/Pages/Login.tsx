import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../Context/AuthContext.tsx';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const {login} =useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, userrole } = response.data;
      login(token, userrole);
      console.log('Login submitted:', formData);
    alert("Login successful!");
    } catch (err) {
      alert("Login failed");
    }
    // After successful login
    navigate('/'); 
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Login</h2>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <button type="submit" style={buttonStyle}>Login</button>

      <p style={{ marginTop: '10px' }}>
        Not a user?{' '}
        <Link to="/register" style={{ textDecoration: 'underline', color: '#007bff' }}>
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  maxWidth: '300px',
  margin: 'auto',
  paddingTop: '100px',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};