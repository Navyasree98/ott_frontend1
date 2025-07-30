import './App.css';
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import MovieTable from "./Pages/MovieTable.tsx";
import EditMovie from "./Pages/EditMovie.tsx";
import AddMovie from "./Pages/AddMovie.tsx";
import AdminPage from "./Pages/AdminPage.tsx";
import Navbar from "./Components/Navbar.tsx";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext.tsx';
import ROUTES from './Constants/route.ts';
import Unauthorized from './Pages/Unauthorized.tsx';
import AdminRoute from './Components/AdminRoute.tsx';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path={ROUTES.ADMIN} element={<AdminPage />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />        
        <Route path={ROUTES.MOVIE_TABLE} element={<AdminRoute><MovieTable/></AdminRoute>} />
        <Route path={ROUTES.EDIT_MOVIE} element={<AdminRoute><EditMovie /></AdminRoute>} />
        <Route path={ROUTES.ADD_MOVIE} element={<AdminRoute><AddMovie /></AdminRoute>} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
