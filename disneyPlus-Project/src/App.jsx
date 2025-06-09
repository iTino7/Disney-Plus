import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyNavBar from "./components/MyNavBar";
import Home from "./components/Home";
import Cerca from "./components/Cerca";
import LaTuaLista from "./components/LaTuaLista";
import Film from "./components/Film";
import Serie from "./components/Serie";
import Originals from "./components/Originals";
import FilmDetails from "./components/FilmDetails";
import SerieDetails from "./components/SerieDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cerca" element={<Cerca />} />
          <Route path="/laTuaLista" element={<LaTuaLista />} />
          <Route path="/film" element={<Film />} />
          <Route path="/film/:filmId" element={<FilmDetails />} />
          <Route path="/serie" element={<Serie />} />
          <Route path="/serie/:seriesId" element={<SerieDetails />} />
          <Route path="/Originals" element={<Originals />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
