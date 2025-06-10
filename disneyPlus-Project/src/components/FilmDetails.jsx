import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import { addFavourite, REMOVE_FILM, toggleButton } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function FilmDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const movie = location.state;
  const [toggle, setToggle] = useState(() => {
    const stored = localStorage.getItem("serieToggles");
    return stored ? JSON.parse(stored) : {};
  });

  const isFavourite = toggle[movie.id] === true;

  const removeFromFavourites = (movieId) => {
    dispatch({
      type: REMOVE_FILM,
      payload: movieId,
    });
  };

  const years = (value) => {
    const y = new Date(value);
    let year = y.getFullYear();

    return year;
  };

  const show = useSelector((state) => state.toggle.show);

  const addFavourites = (movie) => {
    const media_type = movie.media_type
      ? movie.media_type
      : movie.name
      ? "serie"
      : "film";

    dispatch(addFavourite({ ...movie, media_type }));
  };

  const handleClose = () => {
    dispatch(toggleButton(false));
  };
  const handleOpen = () => {
    dispatch(toggleButton(true));
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
                  <Col xs={12} md={6}>
                    <div className="d-flex align-items-center">
                      <Card.Title>
                        {movie.title} - {years(movie.release_date)}
                      </Card.Title>
                      {!isFavourite ? (
                        <Button
                          className="border-0 bg-transparent"
                          onClick={() => {
                            const updatedToggle = {
                              ...toggle,
                              [movie.id]: true,
                            };
                            setToggle(updatedToggle);
                            localStorage.setItem(
                              "serieToggles",
                              JSON.stringify(updatedToggle)
                            );
                            addFavourites(movie);
                            handleOpen();
                          }}
                        >
                          <StarFill style={{ marginBottom: "10px" }} />
                        </Button>
                      ) : (
                        <Button
                          className="border-0 bg-transparent text-warning"
                          onClick={() => {
                            const updatedToggle = {
                              ...toggle,
                              [movie.id]: false,
                            };
                            setToggle(updatedToggle);
                            localStorage.setItem(
                              "serieToggles",
                              JSON.stringify(updatedToggle)
                            );
                            removeFromFavourites(movie.id);
                            handleOpen();
                          }}
                        >
                          <StarFill style={{ marginBottom: "10px" }} />
                        </Button>
                      )}
                    </div>
                    <Card.Text className="text-white">
                      {movie.overview}
                    </Card.Text>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
          </div>
        ) : (
          <h1 className="text-white">Film non trovato</h1>
        )}
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Film</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Il film è stato
            {toggle[movie.id] ? " inserito nella lista!" : " rimosso dalla lista"}
          </p>
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

export default FilmDetails;
