import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";

function SerieDetails() {
  const location = useLocation();
  const series = location.state;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/serie`);
  };

  const years = (value) => {
    const y = new Date(value);
    let year = y.getFullYear();

    return year;
  };

  return (
    <Container>
      <Row>
        {series ? (
          <div
            style={{
              position: "absolute",
              left: "0",
              right: "0",
              bottom: "0",
              top: "0%",
              backgroundImage: `linear-gradient(180deg,rgba(13, 13, 15, 1) 5%, rgba(255, 255, 255, 0) 56%, rgba(13, 13, 15, 1) 100%),url('https://image.tmdb.org/t/p/original${series.backdrop_path}')`,
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Col>
              <Card className="d-flex border-0 bg-transparent text-white">
                <Card.Body
                  className=" d-flex flex-column justify-content-end relative mt-5"
                  style={{ height: "100vh" }}
                >
                  <Col xs={12} md={4}>
                    <Card.Title>
                      {series.name} - {years(series.first_air_date)}
                    </Card.Title>
                    <Card.Text>{series.overview}</Card.Text>
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
          <h1 className="text-white">Serie non trovata</h1>
        )}
      </Row>
    </Container>
  );
}

export default SerieDetails;
