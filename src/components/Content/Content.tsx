import { useEffect, useState } from "react";
import { featchByID, fetchVideo } from "../../data/dataJSON";
import { Button, Fade, Modal } from "@mui/material";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import "./style.scss";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import { Carousel } from "../Carousel";

const Content = ({
  children,
  media_type,
  id,
}: {
  children: any;
  media_type: string;
  id: any;
}) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<any>();
  const [video, setVideo] = useState<any>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await featchByID(media_type, id);
      setContent(data);
    };

    const fetchVideoData = async () => {
      const videoData = await fetchVideo(media_type, id);
      setVideo(videoData);
    };

    fetchData();
    fetchVideoData();
  }, [media_type, id]);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
      >
        <Fade in={open}>
          {content && (
            <div className="content-modal__container">
              <div className="content-modal">
                <div className="content-modal__image">
                  <img
                    src={
                      content.poster_path
                        ? `${img_500}/${content.poster_path}`
                        : unavailable
                    }
                    alt={content.name || content.title}
                    className="content-modal__portrait"
                  />
                  <img
                    src={
                      content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}`
                        : unavailableLandscape
                    }
                    alt={content.name || content.title}
                    className="content-modal__landscape"
                  />
                </div>
                <div className="content-modal__about">
                  <span className="content-modal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="content-modal__tagline">{content.tagline}</i>
                  )}

                  <span className="content-modal__description">
                    {content.overview}
                  </span>
                </div>
              </div>
              <div className="content-modal__actor">
                <div>
                  <Carousel id={id} media_type={media_type} />
                </div>

                <Button
                  variant="contained"
                  startIcon={<SubscriptionsOutlinedIcon />}
                  color="secondary"
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${video?.results[0]?.key}`}
                >
                  Watch the Trailer
                </Button>
              </div>
              <Button onClick={handleClose} className="btn__close">
                <CancelOutlinedIcon />
              </Button>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
};

export default Content;
