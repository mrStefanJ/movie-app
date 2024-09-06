import { useEffect, useState } from "react";
import { fetchSeries } from "../../data/dataJSON";
import { SingleContent } from "../../components/SingleContent";
import { CustomePagination } from "../../components/CustomePagination";
import { Genres } from "../../components/Genres";
import useGenres from "../../CustomHook/useGenres";
import { Result } from "../../type/show";
import { Genre } from "../../type/genre";
import { Search } from "../../components/SearchElement";
import { searchData } from "../../data/dataJSON";
import "./style.scss";
import { Link, useNavigate, useParams } from "react-router-dom";

const Series = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<Result[]>([]);
  const [page, setPage] = useState<number>(Number(number) || 1);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const genreforURL = useGenres(selectedGenres);

  // Update URL on page change
  useEffect(() => {
    navigate(`/tv-shows/${page}`);
  }, [page, navigate]);

  // Loading animation timeout
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  // Fetch data based on search text or genre selection
  useEffect(() => {
    searchText ? fetchSearchData() : fetchData();
  }, [page, genreforURL, searchText]); // eslint-disable-line

  // Fetch series based on selected genres
  const fetchData = async () => {
    try {
      const data = await fetchSeries(page, genreforURL);
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetch movies based on search input
  const fetchSearchData = async () => {
    try {
      const data = await searchData("tv", searchText, page);
      setSearchResults(data.results);
      setNumOfPages(data.total_pages);
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
      <div className="series">
        <Search value={searchText} onChange={handleSearchChange} />
        <Genres
          type="tv"
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
          <div className="series__container">
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((serie: Result) => (
                <Link key={serie.id} to={`/tv/${serie.id}`}>
                  <SingleContent
                    poster={serie.poster_path}
                    title={serie.title || serie.name}
                    media_type="tv"
                    vote_average={serie.vote_average}
                  />
                </Link>
              ))
            ) : content.length > 0 ? (
              content.map((serie: Result) => (
                <Link key={serie.id} to={`/tv/${serie.id}`}>
                  <SingleContent
                    poster={serie.poster_path}
                    title={serie.title || serie.name}
                    media_type="tv"
                    vote_average={serie.vote_average}
                  />
                </Link>
              ))
            ) : (
              <div className="no-series">
                Serie does not exist by selected genres
              </div>
            )}
          </div>
        )}
        <div className="series__pagination">
          {numOfPages && numOfPages > 1 && (
            <CustomePagination
              setPage={setPage}
              numberOfPages={numOfPages}
              currentPage={Number(number)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Series;
