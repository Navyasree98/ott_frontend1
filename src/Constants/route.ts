export interface RoutesType {
  LOGIN: string;
  REGISTER: string;
  DASHBOARD: string;
  MOVIE_TABLE: string;
  EDIT_MOVIE: string;
  ADD_MOVIE: string;
  ADMIN: string;
  UNAUTHORIZED: string;
}

const ROUTES: RoutesType = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/",
  MOVIE_TABLE: "/movie",
  EDIT_MOVIE: "/edit-movie/:id",
  ADD_MOVIE: "/add-movie",
  ADMIN: "/admin",
  UNAUTHORIZED: "/unauthorized",
};

export default ROUTES;
