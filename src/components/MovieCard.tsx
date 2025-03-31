import { Link } from "react-router-dom";
import { Movie } from "../features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favorites/favoritesSlice";

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.list.some((m) => m.imdbID === movie.imdbID)
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.imdbID));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <div
      style={{
        width: 200,
        border: "1px solid #ccc",
        padding: 10,
        textAlign: "center",
      }}
    >
      <img src={movie.Poster} alt={movie.Title} style={{ width: "100%" }} />
      <h4>{movie.Title}</h4>
      <p>{movie.Year}</p>
      <Link to={`/movie/${movie.imdbID}`}>Подробнее</Link>
      <br />
      <button onClick={toggleFavorite}>
        {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      </button>
    </div>
  );
}

export default MovieCard;
