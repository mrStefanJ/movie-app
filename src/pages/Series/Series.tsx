import { useEffect, useState } from "react";
import { SingleContent } from "../../components/SingleContent";
import { fetchSeries } from "../../data/dataJSON";
import { Movie, Result } from "../../type/show";
import { CustomePagination } from "../../components/CustomePagination";
import "./style.scss";
import useGenres from "../../CustomHook/useGenres";
import { Genre } from "../../type/genre";
import { Genres } from "../../components/Genres";
import { Footer } from "../../components/Footer";

const Series = () => {
  const [content, setContent] = useState<Movie>();
  const [page, setPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const genreforURL = useGenres(selectedGenres);

  useEffect(() => {
    fetchData();
  }, [page, genreforURL]); // eslint-disable-line

  const fetchData = async () => {
    const data = fetchSeries(page, genreforURL);
    data
      .then((response) => {
        setContent(response.results);
        setNumOfPages(response.total_pages);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <>
      <div className="series">
        <Genres
          type="tv"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
        <div className="series__container">
          {Array.isArray(content) &&
            content.map((serie: Result) => (
              <SingleContent
                key={serie.id}
                id={serie.id}
                poster={serie.poster_path}
                title={serie.title || serie.name}
                media_type="tv"
                vote_average={serie.vote_average}
              />
            ))}
          {numOfPages && numOfPages > 1 && (
            <CustomePagination setPage={setPage} numberOfPages={numOfPages} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Series;
