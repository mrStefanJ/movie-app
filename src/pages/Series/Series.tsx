import { useEffect, useState } from "react";
import { fetchSeries } from "../../data/dataJSON";
import { SingleContent } from "../../components/SingleContent";
import { CustomePagination } from "../../components/CustomePagination";
import { Genres } from "../../components/Genres";
import { Footer } from "../../components/Footer";
import useGenres from "../../CustomHook/useGenres";
import { Movie, Result } from "../../type/show";
import { Genre } from "../../type/genre";
import "./style.scss";

const Series = () => {
  const [content, setContent] = useState<Movie>();
  const [page, setPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const genreforURL = useGenres(selectedGenres);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, genreforURL]); // eslint-disable-line

  const fetchData = async () => {
    try {
      const data = await fetchSeries(page, genreforURL);
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
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
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="series__container">
            {Array.isArray(content) && content.length > 0 ? (
              content.map((serie: Result) => (
                <SingleContent
                  key={serie.id}
                  id={serie.id}
                  poster={serie.poster_path}
                  title={serie.title || serie.name}
                  media_type="tv"
                  vote_average={serie.vote_average}
                />
              ))
            ) : (
              <div className="no-series">
                Serie does not exist by selected genres
              </div>
            )}
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

export default Series;
