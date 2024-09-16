import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ButtonGroups } from "../../components/ButtonGroups";
import { CustomePagination } from "../../components/CustomePagination";
import { Genres } from "../../components/Genres";
import { Search } from "../../components/SearchElement";
import { SingleContent } from "../../components/SingleContent";
import useGenres from "../../CustomHook/useGenres";
import { fetchMovies, fetchMoviesList, searchData } from "../../data/dataJSON";
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
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!searchText) {
      if (type === "all" || type === "") {
        fetchData();
      } else {
        fetchDataList();
      }
    } else {
      fetchSearchData();
    }
  }, [page, type, genreforURL, searchText]); // eslint-disable-line

  const fetchData = async () => {
    try {
      const data = await fetchMovies(page, genreforURL);
      setContent(data.results || []);
      setNumOfPages(data.total_pages || 0);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchDataList = async () => {
    try {
      const dataList = await fetchMoviesList(page, genreforURL, type);
      setContent(dataList.results || []);
      setNumOfPages(dataList.total_pages || 0);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchSearchData = async () => {
    try {
      const data = await searchData("movie", searchText, page);
      setSearchResults(data.results || []);
      setNumOfPages(data.total_pages || 0);
    } catch (error) {
      console.error("Error fetching search data: ", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    setIsSearchActive(value.trim() !== "");
  };

  const handleSelectCategory = (type: string) => {
    setType(type);
    if (type === "all") {
      fetchData();
    } else {
      fetchDataList();
    }
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
            <ButtonGroups
              category={options}
              activeValue={type}
              onSelectCategory={handleSelectCategory}
              disabled={isSearchActive}
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
