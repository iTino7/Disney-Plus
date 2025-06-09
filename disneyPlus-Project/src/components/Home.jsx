import { Col, Container, Row } from "react-bootstrap";
import FilmForYou from "./FilmForYou";

function Home() {
  return (
    <Container fluid className="mt-3">
      <Row>
        <Col>
          <h4 className="text-white"> Scelti per te </h4>
          <FilmForYou />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
