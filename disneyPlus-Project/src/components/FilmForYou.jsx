import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Pencil, PenFill, Trash } from "react-bootstrap-icons";

function FilmForYou() {
  const [film, setFilm] = useState([]);

  const filmFetch = async () => {
    try {
      const resp = await fetch(
        "https://6844055971eb5d1be0322e55.mockapi.io/movie/movie"
      );
      if (resp.ok) {
        const data = await resp.json();
        setFilm(data);
      } else {
        throw new Error("errore");
      }
    } catch (error) {
      <h1>{error}</h1>;
    }
  };

  useEffect(() => {
    filmFetch();
  }, []);

  console.log(film);

  return (
    <Container fluid>
      <Row>
        {film.map((item, index) => (
          <Col className="mt-3" key={index} xs={12} md={3}>
            <div className="service-card-wrapper">
              <div className="service-card">
                <div className="service-card-inner">
                  <div
                    className="service-card-front d-flex flex-column align-items-center justify-content-center p-4"
                    style={{
                      backgroundImage: `url(${item.bgImage})`,
                      backgroundSize: "container",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>

                  <div className="service-card-back p-4 text-center">
                    <h5 className="mb-3">{item.title}</h5>
                    <ul className="list-unstyled">
                      <li>Custom Website Development</li>
                      <li>Responsive Design</li>
                      <li>Performance Optimization</li>
                      <li>SEO Integration</li>
                    </ul>
                    <Button variant="danger" className="mt-3">
                      <span className="ms-2 mt-1">
                        <Trash />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
              <h4 className="text-white text-center mt-2 ">{item.title}</h4>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FilmForYou;
