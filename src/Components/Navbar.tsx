import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.tsx';
import ROUTES from '../Constants/route.ts';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          onClick={() => navigate(ROUTES.DASHBOARD)}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#FFD700' }}>
            SonyLIV
          </Typography>
        </Box>

        {/* Right Side Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isAuthenticated && isAdmin && (
            <Button color="inherit" onClick={() => navigate(ROUTES.ADMIN)}>
              Admin Panel
            </Button>
          )}
          
          {isAuthenticated ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate(ROUTES.LOGIN)}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;