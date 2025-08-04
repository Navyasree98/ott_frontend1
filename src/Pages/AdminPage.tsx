import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import ROUTES from "../Constants/route.ts";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      <Box display="flex" gap={4} mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(ROUTES.MOVIE_TABLE)}
          sx={{
            width: 150,
            height: 150,
            borderRadius: 2,
            fontSize: '1rem',
            textTransform: 'none',
          }}
        >
          Edit / Delete Movie
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(ROUTES.ADD_MOVIE)}
          sx={{
            width: 150,
            height: 150,
            borderRadius: 2,
            fontSize: '1rem',
            textTransform: 'none',
          }}
        >
          Add Movie
        </Button>
      </Box>
    </Box>
  );
};

export default AdminPage;