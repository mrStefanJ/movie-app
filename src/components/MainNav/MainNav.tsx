import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  const hideMobileNav = () => {
    setIsMobileNavVisible(false);
  };

  return (
    <>
      <nav className="navigation__link">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/trending"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Trending
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Movies
        </NavLink>
        <NavLink
          to="/tv-shows"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          TV Shows
        </NavLink>
      </nav>
      <button onClick={toggleMobileNav} className="navigation__icon">
        {isMobileNavVisible ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
      </button>
      <nav
        className={`navigation__link--mobile ${
          isMobileNavVisible ? "show" : ""
        }`}
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={hideMobileNav}
        >
          Home
        </NavLink>
        <NavLink
          to="/trending"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={hideMobileNav}
        >
          Tending
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={hideMobileNav}
        >
          Movies
        </NavLink>
        <NavLink
          to="/tv-shows"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={hideMobileNav}
        >
          TV Shows
        </NavLink>
      </nav>
    </>
  );
};

export default Navigation;
