import "./App.scss";
import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { Movies } from "./pages/Movies";
import { Series } from "./pages/Series";
import { Home } from "./pages/Home";
import { Trending } from "./pages/Trending";
import { MovieDetail } from "./pages/MovieDetail";
import { SerieDetail } from "./pages/SerieDetail";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="App">
          <Container>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/trending/:number?" element={<Trending />} />
              <Route path="/movies/:number?" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/series/:number?" element={<Series />} />
              <Route path="/serie/:id" element={<SerieDetail />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
