import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMovies } from "../features/search/searchSlice";
import MovieCard from "../components/MovieCard";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";

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
    <Container className="mt-4">
      <h2 className="mb-4">Поиск фильмов</h2>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <Row className="align-items-center">
          <Col xs={8}>
            <Form.Control
              type="text"
              placeholder="Введите название фильма"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col xs={4}>
            <Button variant="dark" type="submit" className="w-100">
              Поиск
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="mt-3">
        {loading && <Spinner animation="border" className="d-block mx-auto" />}
        {error && (
          <Alert variant="danger">
            Ошибка:{" "}
            {error === "Too many results."
              ? "Слишком много результатов, уточните запрос."
              : error}
          </Alert>
        )}
      </div>

      <Row className="mt-4">
        {movies.map((movie) => (
          <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SearchPage;
