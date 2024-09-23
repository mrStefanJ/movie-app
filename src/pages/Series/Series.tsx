import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ButtonGroups } from "../../components/ButtonGroups";
import { CustomePagination } from "../../components/CustomePagination";
import { Genres } from "../../components/Genres";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Search } from "../../components/SearchElement";
import { SingleContent } from "../../components/SingleContent";
import useGenres from "../../CustomHook/useGenres";
import useSearch from "../../CustomHook/useSearch";
import {
  fetchSeries,
  fetchSeriesCategory,
  searchData,
} from "../../data/dataJSON";
import { Genre } from "../../type/genre";
import { Result } from "../../type/show";
import "./style.scss";

const Series = () => {
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
    { label: "Airing Today", value: "airing_today" },
    { label: "On The Air", value: "on_the_air" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
  ];

  useEffect(() => {
    navigate(`/tv-shows/${page}`);
  }, [page, navigate]);

  // Fetch series data based on search, genres, or category
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      // When searchText is present, fetch search results
      if (searchText) {
        data = await searchData("tv", searchText, page);
        setSearchResults(data.results || []);

        // When genres are selected, always fetch using fetchSeries
      } else if (genreforURL) {
        data = await fetchSeries(page, genreforURL);

        // When a specific type is selected, fetch based on category
      } else if (type !== "all") {
        data = await fetchSeriesCategory(page, genreforURL, type);

        // No search, no genres, no type filter, fetch default series
      } else {
        data = await fetchSeries(page, genreforURL);
      }

      setContent(data?.results || []);
      setNumOfPages(data?.total_pages || 0);
      setErrorMessage(undefined);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setErrorMessage(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [searchText, genreforURL, page, type]);

  const handleSelectCategory = (type: string) => {
    setType(type);
    setSearchResults([]);
  };

  // Fetch data on mount, page, genre, type, or search change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="series">
      <Search value={searchText} onChange={handleSearchChange} />
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      {errorMessage ? (
        <div className="error__message">{errorMessage}</div>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <div className="series__container">
          <ButtonGroups
            category={options}
            activeValue={type}
            onSelectCategory={handleSelectCategory}
            disabled={isSearchActive || selectedGenres.length > 0}
          />
          <div className="series__content">
            {searchText ? (
              searchResults.length > 0 ? (
                searchResults.map((serie: Result) => (
                  <SingleContent
                    id={serie.id}
                    poster={serie.poster_path}
                    title={serie.title || serie.name}
                    media_type="tv"
                    vote_average={serie.vote_average}
                  />
                ))
              ) : (
                <div className="no-results">No results found</div>
              )
            ) : content.length > 0 ? (
              content.map((serie: Result) => (
                <SingleContent
                  id={serie.id}
                  poster={serie.poster_path}
                  title={serie.title || serie.name}
                  media_type="tv"
                  vote_average={serie.vote_average}
                />
              ))
            ) : (
              <div className="no-series">
                Serie does not exist by selected genres
              </div>
            )}
          </div>
        </div>
      )}
      <div className="series__pagination">
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

export default Series;
