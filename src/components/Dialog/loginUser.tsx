import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../UserContext";

const Login = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { login } = useUser();
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract form data
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    // Generate a unique ID for the user
    const userId = uuidv4();

    // Store login data in localStorage, including the unique ID
    const loginData = {
      id: userId,
      firstName: formJson.FirstName as string,
      lastName: formJson.LastName as string,
      email: formJson.email as string,
    };

    localStorage.setItem("loginData", JSON.stringify(loginData)); // Save the data in localStorage

    console.log("Login data saved with ID:", loginData);
    login(loginData);

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleLogin,
      }}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To login to this website, please enter your full name and email
          address here.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="firstName"
          name="FirstName"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="lastName"
          name="LastName"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
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
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit">Login</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
