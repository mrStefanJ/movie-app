import { useEffect, useState } from "react";
import { SingleContent } from "../../components/SingleContent";
import { fetchTending, searchData } from "../../data/dataJSON";
import "./style.scss";
import { Movie, Result } from "../../type/show";
import { CustomePagination } from "../../components/CustomePagination";
import { Footer } from "../../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";

const Tending = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<Movie>();
  const [numOfPages, setNumOfPages] = useState<number>();
  const [page, setPage] = useState<number>(Number(number) || 1);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(content);
  useEffect(() => {
    navigate(`/tending/${page}`);
  }, [page, navigate]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    fetchData();
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

  // const fetchSearchData = async () => {
  //   try {
  //     const response = await searchData("movie", searchText, page);
  //     setContent(response.results);
  //     setNumOfPages(response.total_pages);
  //   } catch (error) {
  //     console.error("Error fetching search data: ", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <div className="tending">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="tending__container">
            {/* <Search value={searchText} onChange={(e) => setSearchText(e.target.value)} /> */}
            {Array.isArray(content) &&
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
            {numOfPages && numOfPages > 1 && (
              <CustomePagination
                setPage={setPage}
                numberOfPages={numOfPages}
                currentPage={Number(number)}
              />
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Tending;
