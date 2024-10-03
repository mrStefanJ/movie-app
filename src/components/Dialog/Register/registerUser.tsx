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
import DefaultImage from "../../../assets/default-avatar.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../../UserContext";
import { User } from "../../../type/user";

const RegisterUser = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { register } = useUser();
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
  const [previewImage, setPreviewImage] = useState<string | null>(DefaultImage); // Add type

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
      isActive: true,
    };

    register(newUser);
    handleClose();

    // Reset the form fields after registration
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

  const handleCloseDialog = () => {
    handleClose();
    // Clear the password field when dialog is closed
    setFormData((prev) => ({ ...prev, password: "" }));
    setPreviewImage(DefaultImage);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      setPreviewImage(URL.createObjectURL(file));

      reader.onloadend = () => {
        const result = reader.result;
        if (result) {
          setFormData((prev) => ({ ...prev, image: result as string }));
        } else {
          setFormData((prev) => ({ ...prev, image: null })); // Handle null case
        }
      };

      reader.readAsDataURL(file); // Convert the file to a Base64 string
    } else {
      setFormData((prev) => ({ ...prev, image: null })); // Clear image if no file is selected
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
      className="register__form"
    >
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the blank fields to register!!!
        </DialogContentText>
        <Box className="form--flex">
          <Box className="form__input-field">
            <FormControl sx={{ m: 1 }} variant="standard">
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
            <FormControl sx={{ m: 1 }} variant="standard">
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
          </Box>
          <Box className="form__image">
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Preview" />
              </div>
            )}
            <FormControl className="file-input">
              <label htmlFor="file-upload" className="custome-file-upload">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="file-upload"
                name="image"
                onChange={handleImageChange}
              />
            </FormControl>
          </Box>
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
