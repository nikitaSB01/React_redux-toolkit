import { Link } from "react-router-dom";
import { Movie } from "../features/search/searchSlice";

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
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
    </div>
  );
}

export default MovieCard;
