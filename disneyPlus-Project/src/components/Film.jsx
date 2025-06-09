import React, { useEffect } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import {
//   ADD_FILM,
//   addFavourite,
//   filmFetch,
//   toggleButton,
// } from "../redux/action";
import { filmFetch } from "../redux/action";
import { useNavigate } from "react-router-dom";
import { StarFill } from "react-bootstrap-icons";

function Film() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.film);

  const navigate = useNavigate();

  const handleClick = (value, item) => {
    const routeType = item.media_type === "Serie" ? "Serie" : "film";
    navigate(`/${routeType}/${value}`, { state: item });
  };

  // const show = useSelector((state) => state.toggle.show);

  // const addFavourites = (movie) => {
  //   const media_type = movie.media_type
  //     ? movie.media_type
  //     : movie.name
  //     ? "tv"
  //     : "movie";

  //   dispatch(addFavourite({ ...movie, media_type }));
  // };

  // const handleClose = () => {
  //   dispatch(toggleButton(false));
  // };
  // const handleOpen = () => {
  //   dispatch(toggleButton(true));
  // };

  const URL =
    "https://api.themoviedb.org/3/discover/movie?with_keywords=180547&language=it-IT&page=1";
  const TOKEN_API =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTc1YWEzMWQzZDk2ZDJkNjQwMzczODliZDAyNDc5ZCIsIm5iZiI6MTcxNzQwMzExMC45OTEwMDAyLCJzdWIiOiI2NjVkN2RlNjUxZmQ5OGZiNTcyMzI1MWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s6W_nERiypsdOzk9jAF68sajHIuB2pshwNNghSa3Ax4";

  useEffect(() => {
    dispatch(filmFetch(URL, TOKEN_API));
  }, [dispatch]);

  console.log(movies);

  return (
    <Container>
      <h1 className="text-white text-center my-3">Film</h1>
      <Row>
        {movies.results?.map((item, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index}>
            {/* <Card
              className="d-flex flex-column border-0 my-2"
              style={{
                minHeight: "400px",
              }}
            > */}
            <Card.Img
              onClick={() => handleClick(item.title.replace(/\s+/g, "_"), item)}
              style={{ cursor: "pointer" }}
              className="my-2 rounded img-fluid zoom-on-hover"
              variant="top"
              src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
            />
            {/* <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="text-center">{item.title}</Card.Title>
                <Card.Text
                  className="text-center"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxHeight: "6em",
                  }}
                >
                  {item.overview}
                </Card.Text>
                <div className="d-flex">
                  <Button
                    className="w-100 me-2"
                    variant="warning"
                    onClick={() => handleClick(item.id, item)}
                  >
                    Info
                  </Button>
                  <Button
                    variant="outline-warning"
                    onClick={() => {
                      addFavourites(item);
                      handleOpen();
                    }}
                  >
                    <StarFill />
                  </Button>
                </div>
              </Card.Body> */}
            {/* </Card> */}
          </Col>
        ))}
      </Row>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Film</Modal.Title>
        </Modal.Header>
        <Modal.Body>Il film è stato aggiunto alla tua lista!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
}

export default Film;
