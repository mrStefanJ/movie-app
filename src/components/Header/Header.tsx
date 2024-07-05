import { Box } from "@mui/material";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import "./style.scss";
import { MainNav } from "../MainNav";

const Header = () => {
  return (
    <>
      <Box className="header">
        <Box className="header__icon">
          <MovieCreationOutlinedIcon fontSize="large" />
        </Box>
        <Box className="header__nav">
          <MainNav />
        </Box>
      </Box>
    </>
  );
};

export default Header;
