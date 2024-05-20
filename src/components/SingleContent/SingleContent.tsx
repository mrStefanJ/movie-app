import { Badge } from "../Badge";
import { img_300, unavailable } from "../../config/config";
import "./style.scss";
import { Content } from "../Content";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  name,
}: {
  id: number;
  poster: string;
  title: string;
  date: string;
  media_type: string;
  vote_average: number;
  name: string;
}) => {
  return (
    <>
      <Content media_type={media_type} id={id}>
        <div className="content__media">
          <Badge badgeContent={vote_average} />
          <img
            src={poster ? `${img_300}/${poster}` : unavailable}
            alt={title}
          />
          <div className="content__subTitle">
            <div className="title">
              <p className="content__title">
                {media_type === "tv" ? name : title}
              </p>
            </div>
            <div className="date">
              <span className="content__media-type">
                {media_type === "tv" ? "TV" : "Movie"}
              </span>
              <p className="content__date">
                Relase date: {date === undefined ? "Undefined" : date}
              </p>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default SingleContent;
