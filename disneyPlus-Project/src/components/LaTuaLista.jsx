import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LaTuaLista() {
  const movie = useSelector((state) => state.add.list);

  const navigate = useNavigate();

  const handleClick = (value, item) => {
    const routeType =
      item.media_type?.toLowerCase() === "tv" || item.name ? "serie" : "film";
    navigate(`/${routeType}/${value}`, { state: item });
  };

  console.log(movie);

  return (
    <Container fluid>
      <Row>
        <h1 className="text-white text-center my-3">La tua lista</h1>

        {movie.length > 0 ? (
          <Row>
            {movie.map((movie, item) => (
              <Col
                key={item}
                xs={12}
                sm={6}
                md={3}
                className="d-flex justify-content-center mt-4 p-0"
              >
                <Card
                  style={{ width: "70%", height: "20%" }}
                  className="border-0 mb-4"
                >
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    onClick={() => handleClick(movie.id, movie)}
                    className="img-fluid zoom-on-hover"
                    style={{ cursor: "pointer" }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Col>
            <h4 className="text-white mt-4 ms-3 mb-0 ">
              Nessun film o serie aggiunto ai preferiti
            </h4>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default LaTuaLista;
