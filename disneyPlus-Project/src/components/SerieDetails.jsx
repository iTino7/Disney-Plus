import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Toast,
} from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  addFavourite,
  REMOVE_FILM,
  toggleButton,
  trailerFetch,
} from "../redux/action";

function SerieDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const series = location.state;
  const [toggle, setToggle] = useState(() => {
    const stored = localStorage.getItem("serieToggles");
    return stored ? JSON.parse(stored) : {};
  });

  // const [playVideo, setPlayVideo] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setPlayVideo(true);
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, []);

  const trailer = useSelector((state) => state.trailer.trailer);

  const isFavourite = toggle[series.id] === true;
  console.log(isFavourite);

  const years = (value) => {
    const y = new Date(value);
    let year = y.getFullYear();

    return year;
  };

  const TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTc1YWEzMWQzZDk2ZDJkNjQwMzczODliZDAyNDc5ZCIsIm5iZiI6MTcxNzQwMzExMC45OTEwMDAyLCJzdWIiOiI2NjVkN2RlNjUxZmQ5OGZiNTcyMzI1MWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s6W_nERiypsdOzk9jAF68sajHIuB2pshwNNghSa3Ax4";

  useEffect(() => {
    dispatch(trailerFetch(TOKEN, series.id, "tv"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(trailer);

  const removeFromFavourites = (movieId) => {
    dispatch({
      type: REMOVE_FILM,
      payload: movieId,
    });
  };

  const show = useSelector((state) => state.toggle.show);

  const addFavourites = (movie) => {
    const media_type = movie.media_type
      ? movie.media_type
      : movie.name
      ? "tv"
      : "movie";

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
      const reversedResults = [...trailer.results].reverse();
      window.open(
        `https://www.youtube.com/watch?v=${reversedResults[0].key}`,
        "_blank"
      );
    }
  };

  return (
    <Container>
      <Row>
        {series ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `linear-gradient(180deg,rgba(13, 13, 15, 1) 5%, rgba(255, 255, 255, 0) 56%, rgba(13, 13, 15, 1) 100%),url('https://image.tmdb.org/t/p/original${series.backdrop_path}')`,
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              position: "absolute",
              top: "0",
              right: "0",
              left: "0",
              bottom: "0",
            }}
          >
            {/* {!playVideo ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `linear-gradient(180deg,rgba(13, 13, 15, 1) 5%, rgba(255, 255, 255, 0) 56%, rgba(13, 13, 15, 1) 100%),url('https://image.tmdb.org/t/p/original${series.backdrop_path}')`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            ) : (
              <video
                src="/public/daredevil.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            )} */}
            <Col>
              <Card className="d-flex border-0 bg-transparent text-white">
                <Card.Body
                  className=" d-flex flex-column justify-content-end relative mt-5"
                  style={{ height: "100vh", zIndex: "2" }}
                >
                  <Col xs={12} md={5}>
                    <div className="d-flex align-items-center">
                      <Card.Title>
                        {series.name} - {years(series.first_air_date)}
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
                              [series.id]: true,
                            };
                            setToggle(updatedToggle);
                            localStorage.setItem(
                              "serieToggles",
                              JSON.stringify(updatedToggle)
                            );
                            addFavourites(series);
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
                              [series.id]: false,
                            };
                            setToggle(updatedToggle);
                            localStorage.setItem(
                              "serieToggles",
                              JSON.stringify(updatedToggle)
                            );
                            removeFromFavourites(series.id);
                            handleOpen();
                          }}
                        >
                          <StarFill style={{ marginBottom: "10px" }} />
                        </Button>
                      )}
                    </div>
                    <Card.Text>{series.overview}</Card.Text>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
          </div>
        ) : (
          <h1 className="text-white">Serie non trovata</h1>
        )}
      </Row>
      <Toast
        show={show}
        onClose={handleClose}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 9999,
          minWidth: "250px",
        }}
      >
        <Toast.Header closeButton>
          <strong className="me-auto">Serie</strong>
        </Toast.Header>
        <Toast.Body>
          La serie è stata
          {toggle[series.id]
            ? " inserita alla tua lista."
            : " rimossa dalla tua lista."}
        </Toast.Body>
      </Toast>
    </Container>
  );
}

export default SerieDetails;
