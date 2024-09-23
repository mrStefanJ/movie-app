import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Login } from "../Dialog";
import { useUser } from "../../UserContext";

const Navigation = () => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout } = useUser();

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

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    logout();
    handleCloseUserMenu();
  };

  const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    openDialog();
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
          <Avatar>H</Avatar>
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
            <MenuItem onClick={handleLogin}>
              <Typography sx={{ textAlign: "center" }}>Login</Typography>
            </MenuItem>
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
      <Login open={open} handleClose={closeDialog} />
    </>
  );
};

export default Navigation;
