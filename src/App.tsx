import "./App.scss";
import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { Movies } from "./pages/Movies";
import { Series } from "./pages/Series";
import { Home } from "./pages/Home";
import { Tending } from "./pages/Tending";
import { MovieDetail } from "./pages/MovieDetail";
import { SerieDetail } from "./pages/SerieDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="App">
          <Container>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/tending" element={<Tending />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/series" element={<Series />} />
              <Route path="/serie/:id" element={<SerieDetail />} />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
