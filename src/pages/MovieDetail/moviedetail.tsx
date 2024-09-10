import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "../../components/Carousel";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { VideoYouTube } from "../../components/Video";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import { featchByID, fetchVideo } from "../../data/dataJSON";
import { Genre } from "../../type/genre";
import { ShowDetails } from "../../type/show";
import { Video } from "../../type/video";
import "./style.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<ShowDetails | null>(null);
  const [video, setVideo] = useState<Video>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
    fetchVideoData();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [id]);

  const fetchMovieDetails = async () => {
    if (id) {
      try {
        const data = await featchByID("movie", id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    }
  };

  const fetchVideoData = async () => {
    if (id) {
      const videoData = await fetchVideo("movie", id);
      setVideo(videoData);
    }
  };

  return (
    <div className="movie-details">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="movie__but">
            <Button onClick={() => navigate(-1)} variant="outlined">
              Back
            </Button>
          </div>
          <div className="movie-detail__container">
            <div className="movie-detail">
              <div className="movie-detail__image">
                <img
                  src={
                    movie?.poster_path
                      ? `${img_500}/${movie?.poster_path}`
                      : unavailable
                  }
                  alt={movie?.name || movie?.title}
                  className="image__portrait"
                />
                <img
                  src={
                    movie?.backdrop_path
                      ? `${img_500}/${movie?.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={movie?.name || movie?.title}
                  className="image__landscape"
                />
              </div>
              <div className="movie-detail__about">
                <div className="movie-detail__title">
                  {movie?.name || movie?.title}
                </div>

                <div className="movie-detail__description">
                  {movie?.overview}
                </div>
                {movie?.tagline && (
                  <p className="movie__tagline">
                    <span>Tagline slogans: </span>
                    <i className="tagline">"{movie?.tagline}"</i>
                  </p>
                )}
                <div className="movie-detail__table-details">
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Release date</TableCell>
                          <TableCell>
                            {movie?.release_date || movie?.first_air_date}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Genres</TableCell>
                          <TableCell>
                            <ul className="genre-list">
                              {movie?.genres.map((genre: Genre) => (
                                <li key={genre.id} className="genre-item">
                                  {genre.name}
                                </li>
                              ))}
                            </ul>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Laguage</TableCell>
                          <TableCell>{movie?.original_language}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Status</TableCell>
                          <TableCell>{movie?.status}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <VideoYouTube video={video} />
              </div>
            </div>
            <div className="movie-detail__actor">
              <div>
                <Carousel id={id} media_type={"movie"} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
