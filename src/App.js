import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import SearchIcon from "./Search.svg";
const API_URL = "https://www.omdbapi.com?apikey=ec648708";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMoviesData("war");
  }, []);

  const getMoviesData = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    setMovies(data.Search);
  };

  const handleSubmit = () => {
    getMoviesData(search);
  };

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [() => handleSubmit()]);

  return (
    <div className="app">
      <h1>MovieApp</h1>
      <form className="search" onSubmit={handleSubmit}>
        <input
          placeholder="Search for movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => getMoviesData(search)}
        />
      </form>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
