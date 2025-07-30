import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, MenuItem } from '@mui/material';
import '../Styles/Register.css';
import ROUTES from '../Constants/route.ts';
import {toast} from 'react-toastify';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Inline validation
    if (e.target.name === 'email') {
      setErrors({ ...errors, email: validateEmail(e.target.value) ? '' : 'Invalid email format' });
    }

    if (e.target.name === 'password') {
      setErrors({
        ...errors,
        password: validatePassword(e.target.value)
          ? ''
          : 'Password must be 8+ chars, include uppercase, lowercase, number & special char'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValid = validateEmail(form.email);
    const passwordValid = validatePassword(form.password);

    if (!emailValid || !passwordValid) {
      setErrors({
        email: emailValid ? '' : 'Invalid email format',
        password: passwordValid
          ? ''
          : 'Password must be 8+ chars, include uppercase, lowercase, number & special char'
      });
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      toast(res.data.message);
      navigate(ROUTES.LOGIN);
    } catch (err: any) {
      toast(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <form onSubmit={handleSubmit} className="register-form">
        <Typography variant="h5" gutterBottom>Register</Typography>

        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          value={form.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
        />

        <TextField
          name="password"
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
      </Typography>
    </div>
  );
}

export default Register;
