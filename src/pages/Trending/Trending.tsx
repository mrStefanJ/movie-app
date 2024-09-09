import { useEffect, useState } from "react";
import { SingleContent } from "../../components/SingleContent";
import { fetchTending } from "../../data/dataJSON";
import "./style.scss";
import { Result } from "../../type/show";
import { CustomePagination } from "../../components/CustomePagination";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonGroups from "../../components/ButtonGroups/ButtonGroups";

const Trending = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<Result[]>([]);
  const [type, setType] = useState("all");
  const [numOfPages, setNumOfPages] = useState<number>();
  const [page, setPage] = useState<number>(Number(number) || 1);
  const [loading, setLoading] = useState<boolean>(true);

  const options = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movie" },
    { label: "Series", value: "tv" },
  ];

  useEffect(() => {
    navigate(`/trending/${page}`);
  }, [page, navigate]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, type]); // eslint-disable-line

  const fetchData = async () => {
    try {
      const response = await fetchTending(page, type);
      setContent(response.results);
      setNumOfPages(response.total_pages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      <section className="tending">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="tending__container">
            <ButtonGroups
              options={options}
              activeValue={type}
              onSelect={setType}
            />
            <div className="tending__content">
              {content.length > 0 &&
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

export default Trending;
