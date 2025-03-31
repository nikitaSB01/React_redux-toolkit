import { useAppSelector } from "../hooks";
import MovieCard from "../components/MovieCard";

function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.list);

  return (
    <div style={{ padding: 20 }}>
      <h2>Избранное</h2>
      {favorites.length === 0 ? (
        <p>Нет избранных фильмов</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
