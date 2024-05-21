import { useEffect, useState } from "react";
import { SingleContent } from "../../components/SingleContent";
import { fetchMovies } from "../../data/dataJSON";
import { Movie, Result } from "../../type/movie";
import { CustomePagination } from "../../components/CustomePagination";
import { Genres } from "../../components/Genres";
import useGenres from "../../CustomHook/useGenres";
import { Genre } from "../../type/genre";
import "./style.scss";

const Movies = () => {
  const [content, setContent] = useState<Movie>();
  const [page, setPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const genreforURL = useGenres(selectedGenres);

  useEffect(() => {
    fetchData();
  }, [genreforURL, page]);

  const fetchData = async () => {
    const data = fetchMovies(page, genreforURL);

    data
      .then((response) => {
        setContent(response.results);
        setNumOfPages(response.total_pages);
        if (Array.isArray(response.genre_ids)) {
          setSelectedGenres(response.genre_ids);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <div className="movies">
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="movies__container">
        {Array.isArray(content) &&
          content.map((movie: Result) => (
            <SingleContent
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type="movie"
              vote_average={movie.vote_average}
            />
          ))}
        {numOfPages && numOfPages > 1 && (
          <CustomePagination setPage={setPage} numberOfPages={numOfPages} />
        )}
      </div>
    </div>
  );
};

export default Movies;
