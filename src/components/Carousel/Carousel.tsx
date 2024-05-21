import { useEffect, useState } from "react";
import { fetchCarousel } from "../../data/dataJSON";
import AliceCarousel from "react-alice-carousel";
import { img_300, noPicture } from "../../config/config";
import { Actor } from "../../type/cast";
import "./style.scss";

const Carousel = ({ media_type, id }: { media_type: any; id: any }) => {
  const [carousle, setCarousel] = useState<Actor[]>([]);

  useEffect(() => {
    featchCarouselData();
  }, []);

  const featchCarouselData = async () => {
    const data = await fetchCarousel(media_type, id);
    setCarousel(data?.cast);
  };

  const handleDragStart = (e: any) => e.preventDefault();

  const responsive = {
    0: { items: 1 },
    568: { items: 4 },
    1024: { items: 6 },
  };

  const items = carousle?.map((c: Actor) => (
    <div className="actor">
      <img
        src={c?.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="actor__image"
      />
      <div className="actor__name">
        <p className="actor__full-name">Actor: {c?.name}</p>
        <p className="actor__character">Character: {c?.character}</p>
      </div>
    </div>
  ));

  return (
    <div>
      <AliceCarousel
        autoPlay
        mouseTracking
        items={items}
        responsive={responsive}
        autoPlayInterval={1000}
        animationDuration={1000}
        infinite
        disableDotsControls
        disableButtonsControls
      />
    </div>
  );
};

export default Carousel;
