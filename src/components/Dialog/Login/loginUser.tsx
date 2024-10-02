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

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      id: formData.id,
      firstName: formData.firstName,
      password: formData.password,
      email: formData.email,
      role: formData.role,
    };

    const storedUsers = localStorage.getItem("registeredUsers");
    const userList = storedUsers ? JSON.parse(storedUsers) : [];

    const existingUser = userList.find(
      (user: User) => user.email === userData.email
    );

    // Check if user exists and if the account is active
    if (existingUser) {
      if (!existingUser.isActive) {
        setErrorMessage("Your account is deactivated. Please contact support.");
      } else if (existingUser.password === userData.password) {
        login(userData); // Login only if the account is active and the password is correct
        handleClose();
        setErrorMessage("");
      } else {
        setErrorMessage("Incorrect password.");
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
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
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
        <FormControl sx={{ m: 1, width: "30ch" }} variant="standard">
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </DialogContent>
      <DialogActions>
        <Button type="submit">Login</Button>
        <Button onClick={handleCloseDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
