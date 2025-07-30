import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../Context/AuthContext.tsx';
import '../Styles/Login.css';
import ROUTES from '../Constants/route.ts';
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
    alert("Login successful!");
    } catch (err) {
      alert("Login failed");
    }
    // After successful login
    navigate(ROUTES.DASHBOARD); 
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="login-input"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="login-input"
        required
      />
      <button type="submit" className="login-button">Login</button>

      <p style={{ marginTop: '10px' }}>
        Not a user?{' '}
        <Link to={ROUTES.REGISTER} style={{ textDecoration: 'underline', color: '#007bff' }}>
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
