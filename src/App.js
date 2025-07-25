import './App.css';
import Login from "./Pages/Login.tsx";
import Register from "./Pages/Register.tsx";
import Dashboard from "./Pages/Dashboard";
import MovieTable from "./Pages/MovieTable.tsx";
import EditMovie from "./Pages/EditMovie.tsx";
import AddMovie from "./Pages/AddMovie.tsx";
import AdminPage from "./Pages/AdminPage.tsx";
import Navbar from "./Components/Navbar.tsx";
import { Routes, Route} from "react-router-dom";
import { AuthProvider } from './Context/AuthContext.tsx';

function App() {

  return (
    
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/movie" element={<MovieTable />} />
        <Route path="/edit-movie/:id" element={<EditMovie />} /> 
        <Route path="/add-movie" element={<AddMovie />} />
      </Routes>
    </AuthProvider>

  );
}

export default App;