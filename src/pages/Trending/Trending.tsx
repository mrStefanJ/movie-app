import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonGroups from "../../components/ButtonGroups/ButtonGroups";
import { CustomePagination } from "../../components/CustomePagination";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { SingleContent } from "../../components/SingleContent";
import { fetchTrending } from "../../data/dataJSON";
import { Result } from "../../type/show";
import "./style.scss";

const Trending = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<Result[]>([]);
  const [type, setType] = useState("all");
  const [numOfPages, setNumOfPages] = useState<number>();
  const [page, setPage] = useState<number>(Number(number) || 1);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const options = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movie" },
    { label: "TV Shows", value: "tv" },
  ];

  useEffect(() => {
    navigate(`/trending/${page}`);
  }, [page, navigate]);

  useEffect(() => {
    setLoading(true);
    fetchData(); // eslint-disable-next-line
  }, [page, type]);

  const fetchData = async () => {
    try {
      const response = await fetchTrending(page, type);
      setContent(response.results);
      setNumOfPages(response.total_pages);
      setErrorMessage(undefined);
    } catch (error: any) {
      console.error("Error fetching data: ", error);
      setErrorMessage(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="tending">
        {errorMessage ? (
          <div className="error__message">{errorMessage}</div>
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          <div className="tending__container">
            <ButtonGroups
              category={options}
              activeValue={type}
              onSelectCategory={setType}
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
