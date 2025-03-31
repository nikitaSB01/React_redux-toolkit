import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMovieById } from "../features/details/detailsSlice";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  ListGroup,
} from "react-bootstrap";

function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { movie, loading, error } = useAppSelector((state) => state.details);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Ошибка: {error}</Alert>
      </Container>
    );
  }

  if (!movie) return null;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x445?text=No+Image"
              }
              alt={movie.Title}
            />
          </Card>
        </Col>
        <Col md={8}>
          <h2>{movie.Title}</h2>
          <ListGroup variant="flush" className="mt-3">
            <ListGroup.Item>
              <strong>Год:</strong> {movie.Year}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Жанр:</strong> {movie.Genre}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Длительность:</strong> {movie.Runtime}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Режиссёр:</strong> {movie.Director}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Актёры:</strong> {movie.Actors}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>IMDb рейтинг:</strong> {movie.imdbRating}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieDetailsPage;
