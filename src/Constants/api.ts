const API_BASE_URL = process.env.REACT_APP_Base_URL;

const API = {
  // Auth routes
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REGISTER: `${API_BASE_URL}/auth/register`,

  // Movie routes
  MOVIES: `${API_BASE_URL}/movies`, // For GET all or POST (admin only)
  GET_MOVIE_BY_ID: (id: string) => `${API_BASE_URL}/movies/${id}`, // GET (auth required)
  UPDATE_MOVIE_BY_ID: (id: string) => `${API_BASE_URL}/movies/${id}`, // PUT (admin only)
  DELETE_MOVIE_BY_ID: (id: string) => `${API_BASE_URL}/movies/${id}`, // DELETE (admin only)
};

export default API;
