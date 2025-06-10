import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { seriesFetch } from "../redux/action";
import { useNavigate } from "react-router-dom";

function Film() {
  const dispatch = useDispatch();
  const series = useSelector((state) => state.series.series);

  const navigate = useNavigate();

  const handleClick = (value, item) => {
    const routeType =
      item.media_type?.toLowerCase() === "tv" || item.name ? "serie" : "film";
    navigate(`/${routeType}/${value}`, { state: item });
  };

  const URL =
    "https://api.themoviedb.org/3/discover/tv?with_keywords=180547&language=it-IT&page=1";
  const TOKEN_API =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTc1YWEzMWQzZDk2ZDJkNjQwMzczODliZDAyNDc5ZCIsIm5iZiI6MTcxNzQwMzExMC45OTEwMDAyLCJzdWIiOiI2NjVkN2RlNjUxZmQ5OGZiNTcyMzI1MWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s6W_nERiypsdOzk9jAF68sajHIuB2pshwNNghSa3Ax4";

  useEffect(() => {
    dispatch(seriesFetch(URL, TOKEN_API));
  }, [dispatch]);

  console.log(series);

  return (
    <Container fluid>
      <h1 className="text-white text-center my-3">Serie</h1>
      <Row>
        {series.results?.map((item, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index}>
            <Card.Img
              onClick={() => handleClick(item.name.replace(/\s+/g, "_"), item)}
              style={{ cursor: "pointer" }}
              className="my-2 rounded img-fluid zoom-on-hover"
              variant="top"
              src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Film;
