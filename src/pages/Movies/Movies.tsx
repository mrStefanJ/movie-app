import { useEffect, useState } from "react";
import { fetchMovies } from "../../data/dataJSON";
import { SingleContent } from "../../components/SingleContent";
import { CustomePagination } from "../../components/CustomePagination";
import { Genres } from "../../components/Genres";
import { Footer } from "../../components/Footer";
import useGenres from "../../CustomHook/useGenres";
import { Genre } from "../../type/genre";
import { Movie, Result } from "../../type/show";
import "./style.scss";

const Movies = () => {
  const [content, setContent] = useState<Movie>();
  const [page, setPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const genreforURL = useGenres(selectedGenres);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, genreforURL]); // eslint-disable-line

  const fetchData = async () => {
    try {
      const data = await fetchMovies(page, genreforURL);
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching data: ", error);
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
        {loading ? (
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
                  title={movie.title}
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
