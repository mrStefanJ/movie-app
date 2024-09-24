import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

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
    email: "",
    image: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      // Handle the case when no file is selected
      setFormData((prev) => ({ ...prev, image: null }));
    }
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = {
      id: uuidv4(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      image: formData.image ? URL.createObjectURL(formData.image) : undefined,
    };

    register(newUser);
    handleClose(); // Close dialog after registration
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleRegister,
      }}
    >
      <DialogTitle>Register</DialogTitle>
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
          id="lastName"
          name="lastName"
          label="Last Name"
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
        <input
          type="file"
          accept="image/*"
          id="image"
          name="image"
          onChange={handleFileChange}
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit">Register</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterUser;
