import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import React from 'react';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      alert(res.data.message);
      navigate('/login'); // redirect to login after successful registration
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Register</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <select
          name="role"
          onChange={handleChange}
          value={form.role}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={{ padding: '10px 20px' }}>Register</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  maxWidth: '300px',
  margin: 'auto',
  paddingTop: '100px',
};
