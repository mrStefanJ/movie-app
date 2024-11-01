import "./style.scss";

const Home = () => {
  return (
    <section className="home">
      <div className="home__title">
        Welcome, hope you will Like out list of{" "}
        <span style={{ "--i": 1 } as React.CSSProperties}>M</span>
        <span style={{ "--i": 2 } as React.CSSProperties}>o</span>
        <span style={{ "--i": 3 } as React.CSSProperties}>v</span>
        <span style={{ "--i": 4 } as React.CSSProperties}>i</span>
        <span style={{ "--i": 5 } as React.CSSProperties}>e</span>
        <span style={{ "--i": 6 } as React.CSSProperties}>s</span> and{" "}
        <span style={{ "--i": 7 } as React.CSSProperties}>S</span>
        <span style={{ "--i": 8 } as React.CSSProperties}>e</span>
        <span style={{ "--i": 9 } as React.CSSProperties}>r</span>
        <span style={{ "--i": 10 } as React.CSSProperties}>i</span>
        <span style={{ "--i": 11 } as React.CSSProperties}>e</span>
        <span style={{ "--i": 12 } as React.CSSProperties}>s</span>
      </div>
      <br />
      <p className="home__text">Explore our collection of movies and series.</p>
      <br />
      <p className="home__text">Enjoy your stay!</p>
    </section>
  );
};

export default Home;
