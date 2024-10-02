import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { img_300, unavailable } from "../../config/config";
import { User } from "../../type/user";
import { useUser } from "../../UserContext";
import { Badge } from "../Badge";
import "./style.scss";

const SingleContent = ({
  id,
  poster,
  title,
  media_type,
  vote_average,
}: {
  id: string | number;
  poster: string;
  title: string;
  media_type: string;
  vote_average: number;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { isLoggedIn } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      checkIfFavorite();
    } // eslint-disable-next-line
  }, [user]);

  // Fetch the user data from localStorage
  const fetchUserData = () => {
    const loginData = localStorage.getItem("userData");
    if (loginData) {
      setUser(JSON.parse(loginData));
    }
  };

  // Check if the movie/series is already in favorites
  const checkIfFavorite = () => {
    if (user) {
      const favoritesKey = `favorites_${user.id}`;
      const favorites = JSON.parse(localStorage.getItem(favoritesKey) || "[]");

      const isFav = favorites.some(
        (favorite: any) =>
          favorite.id === id && favorite.media_type === media_type
      );
      setIsFavorite(isFav); // Set the state based on the check
    }
  };

  // Add or remove from favorites
  const handleAddFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (user) {
      const favoritesKey = `favorites_${user.id}`;
      const favorites = JSON.parse(localStorage.getItem(favoritesKey) || "[]");

      const isFav = favorites.some(
        (favorite: any) =>
          favorite.id === id && favorite.media_type === media_type
      );

      let updatedFavorites;
      if (!isFav) {
        // Add new favorite item
        const newFavorite = { id, title, media_type, poster };
        updatedFavorites = [...favorites, newFavorite];
        setIsFavorite(true); // Update the state immediately
      } else {
        // Remove the favorite item
        updatedFavorites = favorites.filter(
          (favorite: any) =>
            !(favorite.id === id && favorite.media_type === media_type)
        );
        setIsFavorite(false); // Update the state immediately
      }

      // Update localStorage
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    }
  };

  return (
    <Link to={`/${media_type}/${id}`}>
      <img
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
        className="content__image"
      />
      <div className="content__subTitle">
        <p className="content__title">{title}</p>
        {isLoggedIn && (
          <Button onClick={handleAddFavorite}>
            {isFavorite ? (
              <FavoriteOutlinedIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </Button>
        )}
        <div className="content__detail">
          <Badge badgeContent={vote_average} />
          <span className="content__media-type">
            {media_type === "tv" ? "TV Series" : "Movie"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SingleContent;
