import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useUser } from "../../../UserContext";
import { User } from "../../../type/user";

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
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      email: formData.email,
    };

    const storedUsers = localStorage.getItem("registeredUsers");
    const userList = storedUsers ? JSON.parse(storedUsers) : [];

    const existingUser = userList.find(
      (user: User) => user.email === userData.email
    );

    if (existingUser) {
      login(userData);
      handleClose();
      setErrorMessage("");
    } else {
      setErrorMessage("User or email doesn't exist, please register.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ component: "form", onSubmit: handleLogin }}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
        <TextField
          required
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </DialogContent>
      <DialogActions>
        <Button type="submit">Login</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
