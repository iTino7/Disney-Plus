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

  const years = (value) => {
    const y = new Date(value);
    let year = y.getFullYear();

    return year;
  };

  console.log(movie);

  return (
    <Container fluid>
      <Row>
        {movie ? (
          <div
            style={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "0",
              top: "0",
              backgroundImage: `linear-gradient(180deg,rgba(13, 13, 15, 1) 5%, rgba(255, 255, 255, 0) 56%, rgba(13, 13, 15, 1) 100%),url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <Col>
              <Card className="d-flex border-0 bg-transparent text-white">
                <Card.Body
                  className=" d-flex flex-column justify-content-end relative mt-5"
                  style={{ height: "100vh" }}
                >
                  <Col xs={12} md={5}>
                    <Card.Title>
                      {movie.title} - {years(movie.release_date)}
                    </Card.Title>
                    <Card.Text className="text-white">
                      {movie.overview}
                    </Card.Text>
                    <Button
                      variant="light"
                      className="w-50 my-4"
                      onClick={() => handleClick()}
                    >
                      <ArrowLeft />
                    </Button>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
          </div>
        ) : (
          <h1 className="text-white">Film non trovato</h1>
        )}
      </Row>
    </Container>
  );
}

export default FilmDetails;
