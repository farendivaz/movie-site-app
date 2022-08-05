import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
const API_URL = `https://www.omdbapi.com?apikey=${process.env.REACT_APP_API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMoviesData();
    // eslint-disable-next-line
  }, []);

  const getMoviesData = async (e) => {
    e.preventDefault();
    const url = `${API_URL}&s=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieApp</h1>
      <form className="search" onSubmit={getMoviesData}>
        <input
          placeholder="Search for movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button">GO</button>
      </form>

      {movies?.length > 0 && (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
