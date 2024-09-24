import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Login, Register } from "../Dialog";
import { useUser } from "../../UserContext";

const Navigation = () => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { isLoggedIn, user, logout } = useUser();

  const toggleMobileNav = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  const hideMobileNav = () => {
    setIsMobileNavVisible(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const openLoginDialog = () => setOpenLogin(true);
  const closeLoginDialog = () => setOpenLogin(false);

  const openRegisterDialog = () => setOpenRegister(true);
  const closeRegisterDialog = () => setOpenRegister(false);

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    openLoginDialog();
    handleCloseUserMenu();
  };

  const handleRegister = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    openRegisterDialog();
    handleCloseUserMenu();
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
        {isLoggedIn && (
          <NavLink
            to="/favorite"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Favorite
          </NavLink>
        )}
      </nav>

      <button onClick={toggleMobileNav} className="navigation__icon">
        {isMobileNavVisible ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
      </button>

      <div className="navigation__avatar">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {!isLoggedIn ? (
            <Avatar>D</Avatar>
          ) : (
            <Avatar alt={user?.firstName} src={user?.image} />
          )}
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {isLoggedIn ? (
            <MenuItem onClick={handleLogout}>
              <Typography sx={{ textAlign: "center" }}>Logout</Typography>
            </MenuItem>
          ) : (
            <Box>
              <MenuItem onClick={handleLogin}>
                <Typography sx={{ textAlign: "center" }}>Login</Typography>
              </MenuItem>
              <MenuItem onClick={handleRegister}>
                <Typography sx={{ textAlign: "center" }}>Register</Typography>
              </MenuItem>
            </Box>
          )}
        </Menu>
      </div>

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
          Trending
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
        {isLoggedIn && (
          <NavLink
            to="/favorite"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={hideMobileNav}
          >
            Favorite
          </NavLink>
        )}
      </nav>
      <Login open={openLogin} handleClose={closeLoginDialog} />
      <Register open={openRegister} handleClose={closeRegisterDialog} />
    </>
  );
};

export default Navigation;
