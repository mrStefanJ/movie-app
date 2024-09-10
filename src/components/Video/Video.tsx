import CloseIcon from "@mui/icons-material/Close";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./style.scss";

interface VideoProps {
  video: any;
}

const Video: React.FC<VideoProps> = ({ video }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="video">
      <IconButton onClick={handleOpen}>
        <SmartDisplayIcon fontSize="large" />
      </IconButton>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {video?.results.length
            ? video.results[video.results.length - 1]?.name
            : "No Trailer Available"}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {video?.results.length ? (
            <iframe
              src={`https://www.youtube.com/embed/${
                video.results[video.results.length - 1]?.key
              }`}
              title={video.results[video.results.length - 1]?.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              width="100%"
              height="400px" // You can adjust height as needed
              frameBorder="0"
            ></iframe>
          ) : (
            <p className="video__message">There are no trailers.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Video;
