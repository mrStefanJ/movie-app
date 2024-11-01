import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonGroups } from "../../components/ButtonGroups";
import { CustomePagination } from "../../components/CustomePagination";
import { Genres } from "../../components/Genres";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Search } from "../../components/SearchElement";
import { SingleContent } from "../../components/SingleContent";
import useGenres from "../../CustomHook/useGenres";
import useSearch from "../../CustomHook/useSearch";
import {
  fetchMovies,
  fetchMoviesCategory,
  searchData,
} from "../../data/dataJSON";
import { Genre } from "../../type/genre";
import { Result } from "../../type/show";
import "./style.scss";

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
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

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

        // No search, no genres, no type filter, fetch default series
      } else {
        data = await fetchMovies(page, genreforURL);
      }

      setContent(data?.results || []);
      setNumOfPages(data?.total_pages || 0);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setErrorMessage(error?.message || "Something went wrong");
    } finally {
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
      <ButtonGroups
        category={options}
        activeValue={type}
        onSelectCategory={handleSelectCategory}
        disabled={isSearchActive || selectedGenres.length > 0}
      />
      {errorMessage ? (
        <div className="error__message">{errorMessage}</div>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <div className="movies__container">
          <div className="movies__content">
            {searchText ? (
              searchResults.length > 0 ? (
                searchResults.map((movie: Result) => (
                  <div key={movie.id} className="movies__list">
                    <SingleContent
                      id={movie.id}
                      poster={movie.poster_path}
                      title={movie.title}
                      media_type="movie"
                      vote_average={movie.vote_average}
                    />
                  </div>
                ))
              ) : (
                <div className="no-results">No results found</div>
              )
            ) : content.length > 0 ? (
              content.map((movie: Result) => (
                <div key={movie.id} className="movies__list">
                  <SingleContent
                    id={movie.id}
                    poster={movie.poster_path}
                    title={movie.title}
                    media_type="movie"
                    vote_average={movie.vote_average}
                  />
                </div>
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
  );
};

export default Movies;
