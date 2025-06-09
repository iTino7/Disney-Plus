import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";

function FilmDetails() {
  const location = useLocation();
  const movie = location.state;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Film`);
  };

  return (
    <Container>
      <Row>
        {movie ? (
          <Col>
            <Card className="d-flex border-0 bg-transparent text-white">
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                style={{ width: "100%", height: "50%", objectFit: "contain" }}
              />

              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.overview}</Card.Text>
                <Button
                  variant="light"
                  className="w-25 my-4"
                  onClick={() => handleClick()}
                >
                  <ArrowLeft />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <h1 className="text-white">Film non trovato</h1>
        )}
      </Row>
    </Container>
  );
}

export default FilmDetails;
