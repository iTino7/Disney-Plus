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

  return (
    <Container>
      <Row>
        {series ? (
          <Col>
            <Card className="d-flex border-0 bg-transparent text-white">
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
                style={{ width: "100%", height: "50%", objectFit: "contain" }}
              />

              <Card.Body>
                <Card.Title>{series.title}</Card.Title>
                <Card.Text>{series.overview}</Card.Text>
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
          <h1 className="text-white">Serie non trovata</h1>
        )}
      </Row>
    </Container>
  );
}

export default SerieDetails;
