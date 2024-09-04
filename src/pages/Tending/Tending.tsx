import { useEffect, useState } from "react";
import { SingleContent } from "../../components/SingleContent";
import { fetchTending } from "../../data/dataJSON";
import "./style.scss";
import { Movie, Result } from "../../type/show";
import { CustomePagination } from "../../components/CustomePagination";
import { Footer } from "../../components/Footer";
import { useParams } from "react-router-dom";

const Tending = () => {
  const [content, setContent] = useState<Movie>();
  const [numOfPages, setNumOfPages] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  console.log(id);

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

  return (
    <>
      <div className="tending">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="tending__container">
            {Array.isArray(content) &&
              content.map((tending: Result) => (
                <SingleContent
                  key={tending.id}
                  id={tending.id}
                  poster={tending.poster_path}
                  title={tending.title || tending.name}
                  media_type={tending.media_type}
                  vote_average={tending.vote_average}
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

export default Tending;
