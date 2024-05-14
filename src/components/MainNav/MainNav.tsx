import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/series">Series</Link>
    </>
  );
};

export default MainNav;
