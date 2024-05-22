import { useEffect, useState } from "react";
import { SingleContent } from "../../components/SingleContent";
import { fetchTending } from "../../data/dataJSON";
import "./style.scss";
import { Movie, Result } from "../../type/movie";
import { CustomePagination } from "../../components/CustomePagination";

const Tending = () => {
  const [content, setContent] = useState<Movie>();
  const [numOfPages, setNumOfPages] = useState<number>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = fetchTending(page);
      data
        .then((response) => {
          setContent(response.results);
          setNumOfPages(response.total_pages);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };

    fetchData();
  }, [page]);

  return (
    <div className="tending">
      <div className="tending__container">
        {Array.isArray(content) &&
          content.map((tending: Result) => (
            <SingleContent
              key={tending.id}
              id={tending.id}
              poster={tending.poster_path}
              title={tending.title || tending.name}
              date={tending.first_air_date || tending.release_date}
              media_type={tending.media_type}
              vote_average={tending.vote_average}
            />
          ))}
        {numOfPages && numOfPages > 1 && (
          <CustomePagination setPage={setPage} numberOfPages={10} />
        )}
      </div>
    </div>
  );
};

export default Tending;
