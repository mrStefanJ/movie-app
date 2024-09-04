import { Badge } from "../Badge";
import { img_300, unavailable } from "../../config/config";
import "./style.scss";

const SingleContent = ({
  id,
  poster,
  title,
  media_type,
  vote_average,
}: {
  id: number;
  poster: string;
  title: string;
  media_type: string;
  vote_average: number;
}) => {
  return (
    <>
      <div className="content__media">
        <Badge badgeContent={vote_average} />
        <img src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
        <div className="content__subTitle">
          <div className="title">
            <p className="content__title">{title}</p>
          </div>
          <div className="content__detail">
            <span className="content__media-type">
              {media_type === "tv" ? "TV Series" : "Movie"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleContent;
