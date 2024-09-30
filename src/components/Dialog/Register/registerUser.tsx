import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../../UserContext";

const RegisterUser = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { register } = useUser();
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    image: "",
    role: "user" as "user" | "admin",
  });
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
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = {
      id: uuidv4(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      email: formData.email,
      image: formData.image,
      role: formData.role,
    };

    register(newUser);
    handleClose(); // Close dialog after registration
    setFormData((prev) => ({ ...prev, password: "" }));
  };

  const handleCloseDialog = () => {
    handleClose();
    // Clear the password field when dialog is closed
    setFormData((prev) => ({ ...prev, password: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };

      reader.readAsDataURL(file); // Convert the file to a Base64 string
    } else {
      setFormData((prev) => ({ ...prev, image: "" })); // Clear if no file is selected
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      PaperProps={{
        component: "form",
        onSubmit: handleRegister,
      }}
    >
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the blank fields to register!!!
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input
              autoFocus
              required
              margin="dense"
              id="firstName"
              name="firstName"
              type="text"
              fullWidth
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input
              required
              margin="dense"
              id="lastName"
              name="lastName"
              type="text"
              fullWidth
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password || ""}
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
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
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
          <FormControl>
            <input
              type="file"
              accept="image/*"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="submit">Register</Button>
        <Button onClick={handleCloseDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterUser;
