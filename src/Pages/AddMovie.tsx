import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, IconButton,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import ROUTES from '../Constants/route.ts';

const AddMoviePage: React.FC = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    description: '',
    genre: '',
    releaseDate: '',
    action: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovieData(prev => ({
      ...prev,
      [name]: name === 'releaseDate' ? new Date(value).toISOString() : value,
    }));
  };

  const handleSubmit = async () => {
  const token = localStorage.getItem("token");

  try {
    await axios.post('http://localhost:5000/api/movies', movieData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token in header
      },
    });
    navigate(ROUTES.MOVIE_TABLE); // Redirect to movie list page
  } catch (error) {
    console.error('Failed to add movie:', error);
  }
};

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <IconButton color="primary" onClick={() => navigate(ROUTES.ADMIN)}>
          <ArrowBack />
        </IconButton>
      </Box>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Add New Movie</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Removed Code input */}
          <TextField label="Title" name="title" value={movieData.title} onChange={handleChange} />
          <TextField label="Description" name="description" value={movieData.description} onChange={handleChange} />
          <TextField label="Genre" name="genre" value={movieData.genre} onChange={handleChange} />
          <TextField
            label="Release Date"
            name="releaseDate"
            type="date"
            value={movieData.releaseDate.slice(0, 10)}
            onChange={handleChange}
          />
          <TextField label="Action" name="action" value={movieData.action} onChange={handleChange} />
          <Button variant="contained" onClick={handleSubmit}>Add Movie</Button>
        </Box>
      </Container>
    </>
  );
};

export default AddMoviePage;