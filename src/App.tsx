import "./App.scss";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { Movies } from "./pages/Movies";
import { Series } from "./pages/Series";
import { Home } from "./pages/Home";
import { Tending } from "./pages/Tending";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Container>
          <Routes>
            <Route path="" Component={Home} />
            <Route path="/tending" Component={Tending} />
            <Route path="/movies" Component={Movies} />
            <Route path="/series" Component={Series} />
          </Routes>
        </Container>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
