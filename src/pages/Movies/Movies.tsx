import { useEffect, useState } from "react";
import { fetchMovies, searchData } from "../../data/dataJSON";
import { SingleContent } from "../../components/SingleContent";
import { CustomePagination } from "../../components/CustomePagination";
import { Genres } from "../../components/Genres";
import useGenres from "../../CustomHook/useGenres";
import { Genre } from "../../type/genre";
import { Result } from "../../type/show";
import "./style.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Search } from "../../components/SearchElement";

const Movies = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<Result[]>([]);
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [page, setPage] = useState<number>(Number(number) || 1);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const genreforURL = useGenres(selectedGenres);

  // Update URL on page change
  useEffect(() => {
    navigate(`/movies/${page}`);
  }, [page, navigate]);

  // Loading animation timeout
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Fetch data based on search text or genre selection
  useEffect(() => {
    searchText ? fetchSearchData() : fetchData();
  }, [page, genreforURL, searchText]); // eslint-disable-line

  // Fetch movies based on selected genres
  const fetchData = async () => {
    try {
      const data = await fetchMovies(page, genreforURL);
      setContent(data.results || []);
      setNumOfPages(data.total_pages || 0);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetch movies based on search input
  const fetchSearchData = async () => {
    try {
      const data = await searchData("movie", searchText, page);
      setSearchResults(data.results || []);
      setNumOfPages(data.total_pages || 0);
    } catch (error) {
      console.error("Error fetching search data: ", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <section className="movies">
        <Search value={searchText} onChange={handleSearchChange} />
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
            {searchText && searchResults.length > 0 ? (
              searchResults.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <SingleContent
                    poster={movie.poster_path}
                    title={movie.title}
                    media_type="movie"
                    vote_average={movie.vote_average}
                  />
                </Link>
              ))
            ) : content.length > 0 ? (
              content.map((movie: Result) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <SingleContent
                    poster={movie.poster_path}
                    title={movie.title}
                    media_type="movie"
                    vote_average={movie.vote_average}
                  />
                </Link>
              ))
            ) : (
              <div className="no-series">
                Movie does not exist by selected genres
              </div>
            )}
          </div>
        )}
        <div className="movies__pagination">
          {numOfPages > 1 && (
            <CustomePagination
              setPage={setPage}
              numberOfPages={numOfPages}
              currentPage={page}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Movies;
