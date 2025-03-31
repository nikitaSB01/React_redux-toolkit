import { Container, Row, Col, Alert } from "react-bootstrap";
import { useAppSelector } from "../hooks";
import MovieCard from "../components/MovieCard";

function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.list);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Избранные фильмы</h2>

      {favorites.length === 0 ? (
        <Alert variant="info">У вас пока нет избранных фильмов.</Alert>
      ) : (
        <Row className="justify-content-center">
          {favorites.map((movie) => (
            <Col
              key={movie.imdbID}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default FavoritesPage;
