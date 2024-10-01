import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Typography,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../../type/user";

const UserDetail = ({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose?: () => void;
  user?: User | null;
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
      setEditedUser(user);
    }
  }, [user]);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSaveChanges = () => {
    if (editedUser) {
      const registerUser = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );

      const updateUser = registerUser.map((user: User) => {
        if (user.id === editedUser.id) {
          return editedUser;
        }
        return user;
      });

      localStorage.setItem(`registeredUsers`, JSON.stringify(updateUser));
      setIsEditing(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="dialog__user">
      <DialogTitle>User Details</DialogTitle>
      {user && (
        <DialogContent key={user.id}>
          <Box className="flex__row">
            <Box sx={{ mb: 2 }}>
              <FormControl sx={{ width: "20ch" }} variant="standard">
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input
                  autoFocus
                  required
                  margin="dense"
                  id="firstName"
                  name="firstName"
                  type="text"
                  fullWidth
                  value={editedUser?.firstName}
                  disabled={!isEditing}
                  onChange={handleUserChange}
                />
              </FormControl>
              <FormControl sx={{ width: "20ch" }} variant="standard">
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input
                  autoFocus
                  required
                  margin="dense"
                  id="lastName"
                  name="lastName"
                  type="text"
                  fullWidth
                  value={editedUser?.lastName}
                  disabled={!isEditing}
                  onChange={handleUserChange}
                />
              </FormControl>
              <FormControl sx={{ width: "20ch" }} variant="standard">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="text"
                  disabled={!isEditing}
                  value={editedUser?.password}
                  onChange={handleUserChange}
                />
              </FormControl>
              <FormControl sx={{ width: "25ch" }} variant="standard">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  autoFocus
                  required
                  margin="dense"
                  id="email"
                  name="email"
                  type="text"
                  fullWidth
                  value={editedUser?.email}
                  disabled={!isEditing}
                  onChange={handleUserChange}
                />
              </FormControl>
            </Box>
            <Box>
              <img
                src={user.image}
                alt={user.firstName}
                className="user__image"
              />
            </Box>
          </Box>
          <Box>
            {/* <Button>{user.isActive ? "Active" : "Deactive"}</Button> */}
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Favorite Movies/Series</Typography>
            {favorites.length > 0 ? (
              <ul>
                {favorites.map((favorite: any) => (
                  <li key={favorite.id}>{favorite.title}</li>
                ))}
              </ul>
            ) : (
              <Typography>No favorites added yet.</Typography>
            )}
          </Box>
        </DialogContent>
      )}
      <DialogActions>
        {isEditing ? (
          <>
            <Button onClick={handleSaveChanges} className="save">
              Save
            </Button>
            <Button onClick={handleEditToggle} className="save">
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={handleEditToggle} className="edit">
            Edit
          </Button>
        )}
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetail;
