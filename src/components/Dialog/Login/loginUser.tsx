import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { useUser } from "../../../UserContext";
import { User } from "../../../type/user";
import "../style.scss";

const Login = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "user" as "user" | "admin",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // remove error message when user is tipping
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  // Helper to find user in localStorage
  const findUser = (email: string) => {
    const storedUsers = localStorage.getItem("registeredUsers");
    const userList = storedUsers ? JSON.parse(storedUsers) : [];
    return userList.find((user: User) => user.email === email);
  };

  // Helper to validate the login
  const validateLogin = (existingUser: User, password: string) => {
    if (!existingUser.isActive) {
      return "Your account is deactivated. Please contact support.";
    }
    if (existingUser.password !== password) {
      return "Incorrect password.";
    }
    return null; // No errors, valid login
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const existingUser = findUser(formData.email);

    // Check if user exists and if the account is active
    if (existingUser) {
      const validationError = validateLogin(existingUser, formData.password);
      if (validationError) {
        setErrorMessage(validationError);
      } else {
        login(existingUser);
        handleClose();
      }
    } else {
      setErrorMessage("Password or Email doesn't exist, please register.");
    }

    setFormData((prev) => ({ ...prev, password: "" }));
  };

  const handleCloseDialog = () => {
    setErrorMessage("");
    handleClose();
    setFormData((prev) => ({ ...prev, password: "" }));
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      PaperProps={{ component: "form", onSubmit: handleLogin }}
      className="login__form"
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            required
            margin="dense"
            id="email"
            name="email"
            type="email"
            fullWidth
            onChange={handleInputChange}
          />
        </FormControl>
        {errorMessage && (
          <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button type="submit">Login</Button>
        <Button onClick={handleCloseDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
