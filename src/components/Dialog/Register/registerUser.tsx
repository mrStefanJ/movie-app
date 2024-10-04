import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
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
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../../UserContext";
import DefaultImage from "../../../assets/default-avatar.png";
import { User } from "../../../type/user";
import "../style.scss";

const RegisterUser = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { register } = useUser(); // Using the register function from UserContext
  const [formData, setFormData] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    image: null,
    role: "user" as "user" | "admin",
    isActive: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(DefaultImage);
  const [error, setError] = useState<string | null>(null); // Error state for email
  const [snackbarOpen, setSnackbarOpen] = useState(false); // For error message

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

  // Handle input changes for the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Register function to check if email exists and register the user if valid
  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = {
      ...formData,
      id: uuidv4(),
      isActive: true,
    };

    const isRegistered = register(newUser); // `register` returns true or false

    if (!isRegistered) {
      // If email already exists, show error message
      setError("The email already exists! Please use a different one.");
      setSnackbarOpen(true);
      return; // Stop further execution if email exists
    }

    // Reset form and close the dialog if registration is successful
    handleClose();
    resetForm();
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      image: null,
      role: "user",
      isActive: false,
    });
    setPreviewImage(DefaultImage);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    handleClose();
    resetForm();
  };

  // Handle snackbar close for error message
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      PaperProps={{
        component: "form",
        onSubmit: handleRegister,
      }}
      className="register__form"
    >
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          INFO: The first user is register has role "admin", the rest have role
          "user"!
        </DialogContentText>

        <Box className="form--flex">
          <Box className="form__input-field">
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                autoFocus
                required
                id="firstName"
                name="firstName"
                type="text"
                fullWidth
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                required
                id="lastName"
                name="lastName"
                type="text"
                fullWidth
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="standard">
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
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                required
                id="email"
                name="email"
                type="email"
                fullWidth
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
          <Box className="form__image">
            {previewImage && <img src={previewImage} alt="Preview" />}
            <FormControl className="file-input">
              <label htmlFor="file-upload" className="custom-file-upload">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="file-upload"
                name="image"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setPreviewImage(URL.createObjectURL(files[0]));
                  }
                }}
              />
            </FormControl>
          </Box>
        </Box>
        {/* Snackbar for displaying error */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </DialogContent>
      <DialogActions>
        <Button type="submit">Register</Button>
        <Button onClick={handleCloseDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterUser;
