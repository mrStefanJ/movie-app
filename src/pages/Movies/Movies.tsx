import { useEffect, useState } from "react";
import { SingleContent } from "../../components/SingleContent";
import { fetchMovies } from "../../data/dataJSON";
import { Movie, Result } from "../../type/show";
import { CustomePagination } from "../../components/CustomePagination";
import { Genres } from "../../components/Genres";
import useGenres from "../../CustomHook/useGenres";
import { Genre } from "../../type/genre";
import "./style.scss";
import { Footer } from "../../components/Footer";

const Movies = () => {
  const [content, setContent] = useState<Movie>();
  const [page, setPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const genreforURL = useGenres(selectedGenres);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
      fetchData();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!initialLoading) {
      fetchData();
    }
  }, [page, genreforURL]); // eslint-disable-line

  const fetchData = async () => {
    setLoading(false);
    try {
      const response = await fetchMovies(page, genreforURL);
      setContent(response.results);
      setNumOfPages(response.total_pages);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(true);
    }
  };

  return (
    <>
      <div className="movies">
        <Genres
          type="movie"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
        {initialLoading || !loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="movies__container">
            {Array.isArray(content) &&
              content.map((movie: Result) => (
                <SingleContent
                  key={movie.id}
                  id={movie.id}
                  poster={movie.poster_path}
                  title={movie.title || movie.name}
                  media_type="movie"
                  vote_average={movie.vote_average}
                />
              ))}
            {numOfPages && numOfPages > 1 && (
              <CustomePagination setPage={setPage} numberOfPages={numOfPages} />
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Movies;
