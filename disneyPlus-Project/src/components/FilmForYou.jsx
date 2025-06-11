import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { homeFilmFetch, toggleButton } from "../redux/action";

function FilmForYou() {
  const show = useSelector((state) => state.toggle.show);

  const [text, setText] = useState({
    title: "",
    year: "",
    genre: "",
    rating: 0,
    description: "",
    img: "",
    isWatched: "",
    logo: "",
    bgImage: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form inviato", text);
    updateFetch();
  };

  const updateFetch = async () => {
    try {
      const resp = await fetch(
        "https://6844055971eb5d1be0322e55.mockapi.io/movie/movie",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(text),
        }
      );
      if (resp.ok) {
        setText({
          title: "",
          year: "",
          genre: "",
          rating: 0,
          description: "",
          img: "",
          isWatched: "",
          logo: "",
          bgImage: "",
        });
        filmFetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleButton(false));
  };
  const handleOpen = () => {
    dispatch(toggleButton(true));
  };

  const film = useSelector((state) => state.home.film);

  const URL = "https://6844055971eb5d1be0322e55.mockapi.io/movie/movie/";

  useEffect(() => {
    dispatch(homeFilmFetch(URL));
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

  const onChange = (e) =>
    setText((old) => ({ ...old, [e.target.name]: e.target.value }));

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col>
          <Container fluid>
            <Row>
              {!film.length ? (
                <Col xs={12} className="d-flex">
                  <h1 className="text-white">Aggiungi Film</h1>
                  <Button
                    onClick={() => handleOpen()}
                    className="bg-transparent border-0"
                  >
                    <Plus className="fs-1 text-warning " />
                  </Button>
                </Col>
              ) : (
                <>
                  <div className="d-flex align-items-center">
                    <h4 className="text-white ms-3">Film</h4>
                    <Button
                      onClick={() => handleOpen()}
                      className="bg-transparent border-0 p-0"
                    >
                      <Plus className="fs-2 text-warning" />
                    </Button>
                  </div>
                  <Row>
                    {film.map((item, index) => (
                      <Col xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card.Img
                          style={{
                            cursor: "pointer",
                            height: "200px",
                            objectFit: "contain",
                          }}
                          className="my-2 rounded pointer img-fluid zoom-on-hover"
                          variant="top"
                          onClick={() => deleteFilmFetch(item.id)}
                          src={item.img}
                        />
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </Row>
            <Modal size="lg" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Aggiungi un film</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12} md={3} className="mb-3">
                      <Form.Control
                        type="text"
                        required
                        value={text.title}
                        onChange={onChange}
                        placeholder="Aggiungi il titolo"
                        name="title"
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        type="text"
                        value={text.year}
                        onChange={onchange}
                        name="year"
                        placeholder="Anno del film..."
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        type="text"
                        required
                        value={text.genre}
                        onChange={onChange}
                        placeholder="genere"
                        name="genre"
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        type="number"
                        required
                        value={text.rating}
                        onChange={onChange}
                        placeholder="rating"
                        name="rating"
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        type="text"
                        required
                        placeholder="Aggiungi la descrizione"
                        value={text.description}
                        onChange={onChange}
                        name="description"
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        type="text"
                        required
                        value={text.img}
                        onChange={onChange}
                        placeholder="aggiungi url dell'immagine"
                        name="img"
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        type="text"
                        required
                        value={text.logo}
                        onChange={onChange}
                        placeholder="aggiungi il logo"
                        name="logo"
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        type="text"
                        required
                        value={text.bgImage}
                        onChange={onChange}
                        placeholder="Aggiungi un'immagine di background..."
                        name="bgImage"
                      />
                    </Col>
                  </Row>
                  <div className="d-flex mt-3">
                    <Button
                      variant="secondary"
                      className="me-2"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default FilmForYou;
