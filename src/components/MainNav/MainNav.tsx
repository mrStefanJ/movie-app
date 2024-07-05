import React, { useState } from "react";
import { Link } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

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
        <Link to="/">Home</Link>
        <Link to="/tending">Tending</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/series">Series</Link>
      </nav>
      <button onClick={toggleMobileNav} className="navigation__icon">
        {isMobileNavVisible ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
      </button>
      <nav
        className={`navigation__link--mobile ${
          isMobileNavVisible ? "show" : ""
        }`}
      >
        <Link to="/" onClick={hideMobileNav}>
          Home
        </Link>
        <Link to="/tending" onClick={hideMobileNav}>
          Tending
        </Link>
        <Link to="/movies" onClick={hideMobileNav}>
          Movies
        </Link>
        <Link to="/series" onClick={hideMobileNav}>
          Series
        </Link>
      </nav>
    </>
  );
};

export default Navigation;
