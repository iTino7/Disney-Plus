import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Pencil, PenFill, Plus, Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleButton } from "../redux/action";

function FilmForYou() {
  const show = useSelector((state) => state.toggle.show);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleButton(false));
  };
  const handleOpen = () => {
    dispatch(toggleButton(true));
  };

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

  const deleteFilmFetch = async (id) => {
    try {
      const resp = await fetch(
        "https://6844055971eb5d1be0322e55.mockapi.io/movie/movie/" + id,
        { method: "DELETE" }
      );
      if (resp.ok) {
        filmFetch();
      } else {
        throw new Error("errore");
      }
    } catch (error) {
      <h1>{error}</h1>;
    }
  };

  useEffect(() => {
    deleteFilmFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(film);

  return (
    <Container fluid>
      <Row>
        {film.length > 0 ? (
          film.map((item, index) => (
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
                      <Button
                        onClick={() => deleteFilmFetch(item.id)}
                        variant="danger"
                        className="mt-3"
                      >
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
          ))
        ) : (
          <Col xs={12} className="d-flex">
            <h1 className="text-white">Aggiungi Film</h1>
            <Button
              onClick={() => handleOpen()}
              className="bg-transparent border-0"
            >
              <Plus className="fs-1 text-warning " />
            </Button>
          </Col>
        )}
      </Row>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi un film</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} md={3} className="mb-3">
                <Form.Control type="text" placeholder="Aggiungi il titolo" />
              </Col>
              <Col xs={12} md={3}>
                <Form.Control type="text" placeholder="Anno del film..." />
              </Col>
              <Col xs={12} md={3}>
                <Form.Control type="text" placeholder="genere" />
              </Col>
              <Col xs={12} md={3}>
                <Form.Control type="number" placeholder="rating" />
              </Col>
              <Col xs={12} md={3}>
                <Form.Control
                  type="text"
                  placeholder="Aggiungi la descrizione"
                />
              </Col>
              <Col xs={12} md={3}>
                <Form.Control
                  type="text"
                  placeholder="aggiungi url dell'immagine"
                />
              </Col>
              <Col xs={12} md={3}>
                <Form.Control type="text" placeholder="aggiungi il logo" />
              </Col>
              <Col xs={12} md={3}>
                <Form.Control type="text" placeholder="backgroundImage" />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default FilmForYou;
