import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import axiosInstance from "../Utils/axiosInstance.tsx";
import API from "../Constants/api.ts";

// Define Movie type
interface Movie {
  _id:string;
 code: string;
  title: string;
  genre: string;
  releaseDate: string;
  description: string;
  action: string;
}

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axiosInstance.get<{ data: Movie[] }>(API.MOVIES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(res.data.data);
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
            <p><strong>Description:</strong> {movie.description}</p>
            <button>{movie.action}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;