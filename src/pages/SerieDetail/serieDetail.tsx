import { useEffect, useState } from "react";
import { ShowDetails } from "../../type/show";
import { Video } from "../../type/video";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { VideoYouTube } from "../../components/Video";
import { Carousel } from "../../components/Carousel";
import { featchByID, fetchVideo } from "../../data/dataJSON";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import { Genre } from "../../type/genre";
import "./style.scss";

const SerieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serie, setSerie] = useState<ShowDetails | null>(null);
  const [video, setVideo] = useState<Video>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSerieDetails();
    fetchVideoData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [id]);

  const fetchSerieDetails = async () => {
    if (id) {
      try {
        const data = await featchByID("tv", id);
        setSerie(data);
      } catch (error) {
        console.error("Error fetching serie details: ", error);
      }
    }
  };

  const fetchVideoData = async () => {
    if (id) {
      const videoData = await fetchVideo("tv", id);
      setVideo(videoData);
    }
  };

  return (
    <div className="serie-details">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="serie__but">
            <Button onClick={() => navigate(-1)} variant="outlined">
              Back
            </Button>
          </div>
          <div className="serie-detail__container">
            <div className="serie-detail">
              <div className="serie-detail__image">
                <img
                  src={
                    serie?.poster_path
                      ? `${img_500}/${serie.poster_path}`
                      : unavailable
                  }
                  alt={serie?.name || serie?.title}
                  className="image__portrait"
                />
                <img
                  src={
                    serie?.backdrop_path
                      ? `${img_500}/${serie.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={serie?.name || serie?.title}
                  className="image__landscape"
                />
              </div>
              <div className="serie-detail__about">
                <div className="serie-detail__title">
                  {serie?.name || serie?.title}
                </div>

                <div className="serie-detail__description">
                  {serie?.overview}
                </div>
                {serie?.tagline && (
                  <p className="serie__tagline">
                    <span>Tagline slogans: </span>
                    <i className="serie-detail__tagline">"{serie?.tagline}"</i>
                  </p>
                )}
                <div className="serie-detail__table-details">
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Release date</TableCell>
                          <TableCell>
                            {serie?.release_date || serie?.first_air_date}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Genres</TableCell>
                          <TableCell>
                            <ul className="genre-list">
                              {serie?.genres.map((genre: Genre) => (
                                <li key={genre.id} className="genre-item">
                                  {genre.name}
                                </li>
                              ))}
                            </ul>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Seasons</TableCell>
                          <TableCell>{serie?.seasons.length}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Language</TableCell>
                          <TableCell>{serie?.original_language}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Status</TableCell>
                          <TableCell>{serie?.status}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <VideoYouTube video={video} />
              </div>
            </div>
            <div className="serie-detail__actor">
              <div>
                <Carousel id={id} media_type={"tv"} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SerieDetail;
