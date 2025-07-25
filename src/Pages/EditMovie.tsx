import React, { useEffect, useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, IconButton
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const EditMoviePage: React.FC = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({
    code: '',
    title: '',
    description: '',
    gener: '',
    releaseDate: '',
    action: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:5000/api/movies/${id}`,{headers: {
        Authorization: `Bearer ${token}`, // Attach token in header
      },});
        setMovieData(res.data);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
     const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/api/movies/${id}`, movieData, {
        headers: {
        Authorization: `Bearer ${token}`, 
  },
});
      navigate('/movie'); // Redirect to dashboard
    } catch (error) {
      console.error('Failed to update movie:', error);
    }
  };

  return (
    <>
   <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
    <IconButton color="primary" onClick={() => navigate("/movie")}>
       <ArrowBack />
    </IconButton>
  </Box>
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Edit Movie</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Code" name="code" value={movieData.code} onChange={handleChange} />
        <TextField label="Title" name="title" value={movieData.title} onChange={handleChange} />
        <TextField label="Description" name="description" value={movieData.description} onChange={handleChange} />
        <TextField label="Genre" name="gener" value={movieData.gener} onChange={handleChange} />
        <TextField label="Release Date" name="releaseDate" value={movieData.releaseDate} onChange={handleChange} />
        <TextField label="Action" name="action" value={movieData.action} onChange={handleChange} />
        <Button variant="contained" onClick={handleUpdate}>Update Movie</Button>
      </Box>
    </Container>
   </>    
    );
};

export default EditMoviePage;