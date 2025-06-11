import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import {
  addFavourite,
  REMOVE_FILM,
  toggleButton,
  trailerFetch,
} from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function FilmDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const movie = location.state;
  const [toggle, setToggle] = useState(() => {
    const stored = localStorage.getItem("serieToggles");
    return stored ? JSON.parse(stored) : {};
  });

  const trailer = useSelector((state) => state.trailer.trailer);

  const isFavourite = toggle[movie.id] === true;

  const removeFromFavourites = (movieId) => {
    dispatch({
      type: REMOVE_FILM,
      payload: movieId,
    });
  };

  const TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTc1YWEzMWQzZDk2ZDJkNjQwMzczODliZDAyNDc5ZCIsIm5iZiI6MTcxNzQwMzExMC45OTEwMDAyLCJzdWIiOiI2NjVkN2RlNjUxZmQ5OGZiNTcyMzI1MWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s6W_nERiypsdOzk9jAF68sajHIuB2pshwNNghSa3Ax4";

  const years = (value) => {
    const y = new Date(value);
    let year = y.getFullYear();

    return year;
  };

  useEffect(() => {
    dispatch(trailerFetch(TOKEN, movie.id, "movie"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(trailer);
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

  const handleTrailer = () => {
    if (trailer.results.length > 0) {
      window.open(
        `https://www.youtube.com/watch?v=${trailer.results[0].key}`,
        "_blank"
      );
    }
  };

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
                      <Button
                        onClick={() => {
                          handleTrailer();
                        }}
                        className="mb-2 bg-transparent border-0"
                      >
                        Trailer
                      </Button>
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
            {toggle[movie.id]
              ? " inserito nella lista!"
              : " rimosso dalla lista"}
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
