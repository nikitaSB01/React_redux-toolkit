import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMovieById } from "../features/details/detailsSlice";

function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { movie, loading, error } = useAppSelector((state) => state.details);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [id, dispatch]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;
  if (!movie) return null;

  return (
    <div style={{ padding: 20 }}>
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <p>
        <strong>Год:</strong> {movie.Year}
      </p>
      <p>
        <strong>Жанр:</strong> {movie.Genre}
      </p>
      <p>
        <strong>Длительность:</strong> {movie.Runtime}
      </p>
      <p>
        <strong>Режиссёр:</strong> {movie.Director}
      </p>
      <p>
        <strong>Актёры:</strong> {movie.Actors}
      </p>
      <p>
        <strong>Рейтинг IMDb:</strong> {movie.imdbRating}
      </p>
    </div>
  );
}

export default MovieDetailsPage;
