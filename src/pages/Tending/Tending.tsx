import { useEffect, useState } from "react";
import { SingleContent } from "../../components/SingleContent";
import { fetchTending } from "../../data/dataJSON";
import "./style.scss";
import { Movie, Result } from "../../type/movie";
import { CustomePagination } from "../../components/CustomePagination";

const Tending = () => {
  const [content, setContent] = useState<Movie>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const data = fetchTending(page);
    data
      .then((response) => {
        setContent(response.results);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <div className="tending__container">
      <div className="tending__movies">
        {Array.isArray(content) &&
          content.map((movie: Result) => (
            <SingleContent
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              name={movie.name}
              date={movie.release_date}
              media_type={movie.media_type}
              vote_average={movie.vote_average}
            />
          ))}
        <CustomePagination setPage={setPage} numberOfPages={10} />
      </div>
    </div>
  );
};

export default Tending;
