import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { DashCircle, Pencil, Plus } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFilmFetch,
  homeFilmFetch,
  toggleButton,
  putFilmFetch,
} from "../redux/action";

function FilmForYou() {
  const show = useSelector((state) => state.toggle.show);
  const dispatch = useDispatch();
  const film = useSelector((state) => state.home.film);
  const URL = "https://6844055971eb5d1be0322e55.mockapi.io/movie/movie";

  const [editId, setEditId] = useState(null);
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

  useEffect(() => {
    dispatch(homeFilmFetch(URL));
  }, [dispatch]);

  const handleOpen = () => dispatch(toggleButton(true));
  const handleClose = () => {
    dispatch(toggleButton(false));
    setEditId(null);
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
  };

  const handleDelete = (id) => {
    dispatch(deleteFilmFetch(URL, id));
  };

  const handleEdit = (edit) => {
    setText(edit);
    setEditId(edit.id);
    dispatch(toggleButton(true));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(putFilmFetch(URL, editId, text));
    } else {
      updateFetch();
    }
    handleClose();
  };

  const updateFetch = async () => {
    try {
      const resp = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
      });

      if (resp.ok) {
        dispatch(homeFilmFetch(URL));
      }
    } catch (error) {
      console.log("Errore durante il POST:", error);
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
                    onClick={handleOpen}
                    className="bg-transparent border-0"
                  >
                    <Plus className="fs-1 text-warning" />
                  </Button>
                </Col>
              ) : (
                <>
                  <div className="d-flex align-items-center">
                    <h4 className="text-white ms-3 mb-1">Film</h4>
                    <Button
                      onClick={handleOpen}
                      className="bg-transparent border-0 p-0"
                    >
                      <Plus className="fs-2 text-warning" />
                    </Button>
                  </div>
                  <Row>
                    {film.map((item, index) => (
                      <Col xs={12} sm={6} md={4} lg={3} key={index}>
                        <div
                          style={{ position: "relative", height: "200px" }}
                          className="my-2"
                        >
                          <Card.Img
                            style={{
                              height: "100%",
                              objectFit: "cover",
                              width: "100%",
                              borderRadius: "8px",
                              cursor: "pointer",
                            }}
                            className="pointer img-fluid"
                            variant="top"
                            src={item.img}
                          />
                          <Button
                            style={{
                              position: "absolute",
                              top: "8px",
                              right: "8px",
                              zIndex: 2,
                            }}
                            className="bg-transparent border-0 p-0 m-0"
                            onClick={() => handleDelete(item.id)}
                          >
                            <DashCircle className="fs-4 text-danger" />
                          </Button>
                          <Button
                            style={{
                              position: "absolute",
                              top: "8px",
                              left: "8px",
                              zIndex: 2,
                              color: "white",
                              fontWeight: "bold",
                              backgroundColor: "rgba(0,0,0,0.6)",
                              border: "none",
                              borderRadius: "4px",
                              padding: "2px 6px",
                            }}
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="text-warning fs-5"/>
                          </Button>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </Row>

            <Modal size="lg" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {editId ? "Modifica film" : "Aggiungi un film"}
                </Modal.Title>
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
                        onChange={onChange}
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
                        placeholder="Genere"
                        name="genre"
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Form.Control
                        type="number"
                        required
                        value={text.rating}
                        onChange={onChange}
                        placeholder="Rating"
                        name="rating"
                      />
                    </Col>
                    <Col xs={12} md={3} className="mt-2">
                      <Form.Control
                        type="text"
                        required
                        placeholder="Descrizione"
                        value={text.description}
                        onChange={onChange}
                        name="description"
                      />
                    </Col>
                    <Col xs={12} md={3} className="mt-2">
                      <Form.Control
                        type="text"
                        required
                        value={text.img}
                        onChange={onChange}
                        placeholder="URL immagine"
                        name="img"
                      />
                    </Col>
                    <Col xs={12} md={3} className="mt-2">
                      <Form.Control
                        type="text"
                        required
                        value={text.logo}
                        onChange={onChange}
                        placeholder="Logo"
                        name="logo"
                      />
                    </Col>
                    <Col xs={12} md={3} className="mt-2">
                      <Form.Control
                        type="text"
                        required
                        value={text.bgImage}
                        onChange={onChange}
                        placeholder="Immagine background"
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
                      Chiudi
                    </Button>
                    <Button variant="primary" type="submit">
                      {editId ? "Salva Modifiche" : "Aggiungi"}
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
