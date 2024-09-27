import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Admin } from "./pages/Admin";
import { Favorite } from "./pages/Favorite";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import { Movies } from "./pages/Movies";
import { SerieDetail } from "./pages/SerieDetail";
import { Series } from "./pages/Series";
import { Trending } from "./pages/Trending";
import ProtectedRoute from "./ProtectedRoute";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <main className="App">
            <Container>
              <Routes>
                <Route path="" element={<Home />} />
                <Route path="/trending/:number?" element={<Trending />} />
                <Route path="/movies/:number?" element={<Movies />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/tv-shows/:number?" element={<Series />} />
                <Route path="/tv/:id" element={<SerieDetail />} />
                <Route
                  path="/favorite"
                  element={
                    <ProtectedRoute>
                      <Favorite />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Container>
          </main>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
