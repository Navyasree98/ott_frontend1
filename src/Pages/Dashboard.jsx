import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"; // Optional for styling

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch all movies from backend
    const fetchMovies = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/movies", {
        headers: {
        Authorization: `Bearer ${token}`, 
  },
});
        setMovies(res.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <input
          type="text"
          placeholder="Search movies by title ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div className="movie-card" key={movie._id}>
            <h3>{movie.title}</h3>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Release:</strong> {new Date(movie.releaseDate).toDateString()}</p>
            <p><strong>Description:</strong>{movie.description}</p>
            <button>{movie.action}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;