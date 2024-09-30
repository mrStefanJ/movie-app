import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import { Box } from "@mui/material";
import { MainNav } from "../MainNav";
import "./style.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <Box className="header__icon">
          <NavLink to="/">
            <MovieCreationOutlinedIcon fontSize="large" />
          </NavLink>
        </Box>
        <Box className="header__nav">
          <MainNav />
        </Box>
      </header>
    </>
  );
};

export default Header;
