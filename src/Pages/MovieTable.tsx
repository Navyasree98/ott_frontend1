import React, { useEffect, useState } from "react";
import { ArrowBack, Edit, Delete } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

  interface Movie {
  _id: string;
  code: string;
  title: string;
  genre: string;
  releaseDate: Date;
  action?: string;
}
const MovieTable = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(0); // pagination page
  const [rowsPerPage, setRowsPerPage] = useState(5); // default rows per page

  const navigate = useNavigate();

  const fetchMovies = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/movies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(res.data.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMovies();
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-movie/${id}`);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <IconButton color="primary" onClick={() => navigate("/admin")}>
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Movie List
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Code</TableCell>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
              <TableCell sx={{ color: "white" }}>Genre</TableCell>
              <TableCell sx={{ color: "white" }}>Release Date</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movie) => (
              <TableRow key={movie._id}>
                <TableCell>{movie.code}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{new Date(movie.releaseDate).toDateString()}</TableCell>
                <TableCell>{movie.action}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(movie._id)}
                    sx={{ marginRight: 1 }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(movie._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {movies.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No movies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Pagination */}
        <TablePagination
          component="div"
          count={movies.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </Box>
  );
};

export default MovieTable;