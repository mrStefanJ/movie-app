import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ButtonGroups } from "../../components/ButtonGroups";
import { CustomePagination } from "../../components/CustomePagination";
import { Genres } from "../../components/Genres";
import { Search } from "../../components/SearchElement";
import { SingleContent } from "../../components/SingleContent";
import useGenres from "../../CustomHook/useGenres";
import {
  fetchMovies,
  fetchMoviesCategory,
  searchData,
} from "../../data/dataJSON";
import { Genre } from "../../type/genre";
import { Result } from "../../type/show";
import "./style.scss";
import useSearch from "../../CustomHook/useSearch"; // Import the custom hook

const Movies = () => {
  const { number } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState<Result[]>([]);
  const [type, setType] = useState("all");
  const [page, setPage] = useState<number>(Number(number) || 1);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<Result[]>([]);

  const { searchText, isSearchActive, handleSearchChange } = useSearch();

  const genreforURL = useGenres(selectedGenres);

  const options = [
    { label: "All", value: "all" },
    { label: "Now Playing", value: "now_playing" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
  ];

  useEffect(() => {
    navigate(`/movies/${page}`);
  }, [page, navigate]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const loadingTimeout = setTimeout(() => setLoading(false), 5000);
    try {
      let data;
      // When searchText is present, fetch search results
      if (searchText) {
        data = await searchData("movie", searchText, page);
        setSearchResults(data.results || []);

        // When genres are selected, always fetch using fetchMovies
      } else if (genreforURL) {
        data = await fetchMovies(page, genreforURL);

        // When a specific type is selected, fetch based on category
      } else if (type !== "all") {
        data = await fetchMoviesCategory(page, genreforURL, type);

        // Default case: No search, no genres, no type filter, fetch default series
      } else {
        data = await fetchMovies(page, genreforURL);
      }

      setContent(data?.results || []);
      setNumOfPages(data?.total_pages || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      clearTimeout(loadingTimeout);
      setLoading(false);
    }
  }, [searchText, genreforURL, page, type]);

  const handleSelectCategory = (type: string) => {
    setType(type);
    setSearchResults([]); // Clear search results when a new category is selected
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <section className="movies">
        {/* Use Search input with the custom hook */}
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
            <ButtonGroups
              category={options}
              activeValue={type}
              onSelectCategory={handleSelectCategory}
              disabled={isSearchActive || selectedGenres.length > 0}
            />
            <div className="movies__content">
              {searchText ? (
                searchResults.length > 0 ? (
                  searchResults.map((movie: Result) => (
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
                  <div className="no-results">No results found</div>
                )
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
