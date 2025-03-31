import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMovies } from "../features/search/searchSlice";
import MovieCard from "../components/MovieCard";

function SearchPage() {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.search);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchMovies(query.trim()));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Поиск фильмов</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите название фильма"
      />
      <button onClick={handleSearch}>Поиск</button>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}

      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
