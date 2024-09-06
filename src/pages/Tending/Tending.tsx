import { useEffect, useState } from "react";
import { SingleContent } from "../../components/SingleContent";
import { fetchTending, searchData } from "../../data/dataJSON";
import "./style.scss";
import { Result } from "../../type/show";
import { CustomePagination } from "../../components/CustomePagination";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Search } from "../../components/SearchElement";

const Tending = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<Result[]>([]);
  const [numOfPages, setNumOfPages] = useState<number>();
  const [page, setPage] = useState<number>(Number(number) || 1);
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    navigate(`/tending/${page}`);
  }, [page, navigate]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    searchText ? fetchSearchData() : fetchData();
  }, [page]); // eslint-disable-line

  const fetchData = async () => {
    try {
      const response = await fetchTending(page);
      setContent(response.results);
      setNumOfPages(response.total_pages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetch movies based on search input
  const fetchSearchData = async () => {
    try {
      const data = await searchData("movie" || "tv", searchText, page);

      const trendingResults = data.results.filter(
        (item: any) => item.media_type === "movie" || item.media_type === "tv"
      );

      setSearchResults(trendingResults || []);
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
      <section className="tending">
        <Search value={searchText} onChange={handleSearchChange} />
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="tending__container">
            {searchResults && searchResults.length > 0
              ? searchResults.map((content: Result) => (
                  <Link key={content.id} to={`/tending/${content.id}`}>
                    <SingleContent
                      poster={content.poster_path}
                      title={content.title || content.name}
                      media_type={content.media_type}
                      vote_average={content.vote_average}
                    />
                  </Link>
                ))
              : content.length > 0 &&
                content.map((tending: Result) => (
                  <Link
                    key={tending.id}
                    to={`/${tending.media_type}/${tending.id}`}
                  >
                    <SingleContent
                      poster={tending.poster_path}
                      title={tending.title || tending.name}
                      media_type={tending.media_type}
                      vote_average={tending.vote_average}
                    />
                  </Link>
                ))}
          </div>
        )}
        <div className="tending__pagination">
          {numOfPages && numOfPages > 1 && (
            <CustomePagination
              setPage={setPage}
              numberOfPages={numOfPages}
              currentPage={Number(number)}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Tending;
