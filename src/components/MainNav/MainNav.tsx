import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <>
      <nav className="navigation__link">
        <Link to="/">Home</Link>
        <Link to="/tending">Tending</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/series">Series</Link>
      </nav>
    </>
  );
};

export default MainNav;
