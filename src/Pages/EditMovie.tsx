import React, { useEffect, useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, IconButton
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import ROUTES from '../Constants/route.ts';
import axiosInstance from '../Utils/axiosInstance.tsx';
import API from '../Constants/api.ts';
import {toast} from 'react-toastify';

const EditMoviePage: React.FC = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({
  code: '',
  title: '',
  description: '',
  genre: '',
  releaseDate: '',
  action: '',
});

  const navigate = useNavigate();

  useEffect(() => {
  const fetchMovie = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get(API.GET_MOVIE_BY_ID(id!), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Get Movie By ID:", res.data);

      // Destructure only required fields from res.data.data
      const { code, title, description, genre, releaseDate, action } = res.data.data;

      setMovieData({
        code,
        title,
        description,
        genre,
        releaseDate: releaseDate?.slice(0, 10) || '',
        action,
      });
    } catch (error) {
      console.error('Failed to fetch movie:', error);
    }
  };

  fetchMovie();
}, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
    console.log("MovieData",movieData);
  };

  const handleUpdate = async () => {
     const token = localStorage.getItem("token");
    try {
      await axiosInstance.put(API.UPDATE_MOVIE_BY_ID(id!), movieData, {
        headers: {
        Authorization: `Bearer ${token}`, 
  },
  });
      toast("Edited movie suceessfully");
      navigate(ROUTES.MOVIE_TABLE); // Redirect to dashboard
    } catch (error) {
      toast('Failed to update movie:', error);
    }
  };

  return (
    <>
   <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
    <IconButton color="primary" onClick={() => navigate(ROUTES.MOVIE_TABLE)}>
       <ArrowBack />
    </IconButton>
  </Box>
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Edit Movie</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Code" name="code" value={movieData.code} onChange={handleChange} />
        <TextField label="Title" name="title" value={movieData.title} onChange={handleChange} />
        <TextField label="Description" name="description" value={movieData.description} onChange={handleChange} />
        <TextField label="Genre" name="genre" value={movieData.genre} onChange={handleChange} />
        <TextField label="Release Date" name="releaseDate" type="date" value={movieData.releaseDate} onChange={handleChange} />
        <TextField label="Action" name="action" value={movieData.action} onChange={handleChange} />
        <Button variant="contained" onClick={handleUpdate}>Update Movie</Button>
      </Box>
    </Container>
   </>    
    );
};

export default EditMoviePage;