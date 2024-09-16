import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Chip, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchGenres } from "../../data/dataJSON";
import { Genre } from "../../type/genre";
import "./style.scss";

const Genres = ({
  type,
  selectedGenres = [],
  setSelectedGenres,
  setGenres,
  genres,
  setPage,
}: {
  type: string;
  genres: Genre[];
  selectedGenres: Genre[];
  setSelectedGenres: (selectedGenres: any) => void;
  setGenres: (genres: any) => void;
  setPage: any;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchGenresData();

    return () => {
      setGenres([]);
    };
  }, [type]); // eslint-disable-line

  const fetchGenresData = async () => {
    const data = fetchGenres(type);

    data
      .then((response) => {
        setGenres(response.genres);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleAdd = (genre: Genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setPage(1);
  };

  const handleRemove = (genre: Genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected: Genre) => selected.id !== genre.id)
    );
    setPage(1);
  };

  const selectedGenreIds = new Set(selectedGenres.map((genre) => genre.id));

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div
        className="genres__container"
        style={{ left: isExpanded ? "0px" : "-140px" }}
      >
        <div className="genres__name">
          <Stack spacing={1}>
            {genres &&
              genres.map((genre: Genre) => {
                const isSelected = selectedGenreIds.has(genre.id);
                return (
                  <Chip
                    label={`${genre.name}`}
                    key={genre.id}
                    variant="outlined"
                    color={isSelected ? "primary" : "default"}
                    clickable
                    onClick={() =>
                      isSelected ? handleRemove(genre) : handleAdd(genre)
                    }
                    onDelete={
                      isSelected ? () => handleRemove(genre) : undefined
                    }
                  />
                );
              })}
          </Stack>
        </div>
        <div className="genres__icon" onClick={toggleSidebar}>
          <FilterAltIcon />
        </div>
      </div>
    </>
  );
};

export default Genres;
