import "./style.scss";

const Badge = ({ badgeContent }: { badgeContent: number }) => {
  const averageRating = badgeContent > 6 ? "good__raiting" : "bad__raiting";

  return (
    <div className={`badge__container ${averageRating}`}>
      10 / {Math.round(badgeContent * 10) / 10}
    </div>
  );
};

export default Badge;
