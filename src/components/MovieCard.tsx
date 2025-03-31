import { Card, Button } from "react-bootstrap";
import { Movie } from "../features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favorites/favoritesSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/movie/${movie.imdbID}`);
  };
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
    <Card className="h-100 shadow-sm" style={{ minWidth: "250px" }}>
      <Card.Img
        variant="top"
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x445?text=No+Image"
        }
        alt={movie.Title}
        style={{ height: "445px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{movie.Title}</Card.Title>
        <Card.Text className="text-muted text-center">{movie.Year}</Card.Text>
        <div className="mt-auto">
          <Button
            variant="primary"
            onClick={handleDetails}
            className="w-100 mb-2"
          >
            Подробнее
          </Button>

          <Button
            variant={isFavorite ? "danger" : "outline-primary"}
            onClick={toggleFavorite}
            className="w-100"
          >
            {isFavorite ? "Удалить из избранного" : "В избранное"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
