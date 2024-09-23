import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { img_300, unavailable } from "../../config/config";
import "./style.scss";

interface FavoriteItem {
  id: any;
  title: string;
  media_type: string;
  poster: string;
}

const Favorite = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = () => {
    const loginData = localStorage.getItem("loginData");
    if (loginData) {
      const user = JSON.parse(loginData);
      const favoritesKey = `favorites_${user.id}`;
      const storedFavorites = JSON.parse(
        localStorage.getItem(favoritesKey) || "[]"
      );

      // Set the favorites state with the retrieved data
      setFavorites(storedFavorites);
    }
  };

  const removeFavorite = (id: any) => {
    const loginData = localStorage.getItem("loginData");
    if (loginData) {
      const user = JSON.parse(loginData);
      const favoritesKey = `favorites_${user.id}`;

      // Filter out the item with the given id
      const updatedFavorites = favorites.filter((item) => item.id !== id);

      // Update state and local storage
      setFavorites(updatedFavorites);
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    }
  };

  return (
    <section className="favorite__container">
      <h2>Your Favorites</h2>
      {favorites.length > 0 ? (
        <div className="favorite__list">
          {favorites.map((item: FavoriteItem) => (
            <div key={item.id} className="favorite__item">
              <Link to={`/${item.media_type}/${item.id}`}>
                <img
                  src={item.poster ? `${img_300}/${item.poster}` : unavailable}
                  alt={item.title}
                />
              </Link>
              <div className="favorite__details">
                <h3 className="favorite__title">{item.title}</h3>
                <p className="favorite__media-type">
                  {item.media_type === "tv" ? "TV Series" : "Movie"}
                </p>
                <Button
                  className="favorite-remove__button"
                  onClick={() => removeFavorite(item.id)}
                >
                  <FavoriteOutlinedIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-favorite">No favorites added yet.</div>
      )}
    </section>
  );
};

export default Favorite;
