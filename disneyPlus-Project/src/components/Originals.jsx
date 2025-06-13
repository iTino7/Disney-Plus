import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { originalsFetch } from "../redux/action";
import { useEffect } from "react";

function Originals() {
  const dispatch = useDispatch();

  const originals = useSelector((state) => state.trend.originals);

  const navigate = useNavigate();

  const handleClick = (value, item) => {
    const routeType =
      item.media_type?.toLowerCase() === "tv" || item.name ? "serie" : "film";
    navigate(`/${routeType}/${value}`, { state: item });
  };

  const URL =
    "https://api.themoviedb.org/3/discover/movie?with_companies=25&language=it-IT";
  const TOKEN_API =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTc1YWEzMWQzZDk2ZDJkNjQwMzczODliZDAyNDc5ZCIsIm5iZiI6MTcxNzQwMzExMC45OTEwMDAyLCJzdWIiOiI2NjVkN2RlNjUxZmQ5OGZiNTcyMzI1MWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s6W_nERiypsdOzk9jAF68sajHIuB2pshwNNghSa3Ax4";

  useEffect(() => {
    dispatch(originalsFetch(URL, TOKEN_API));
  }, [dispatch]);

  return (
    <Container fluid>
      <h1 className="text-white text-center my-3">Originals</h1>
      <Row>
        {originals.results?.map((item, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index}>
            <Card.Img
              onClick={() => handleClick(item.id, item)}
              style={{ cursor: "pointer" }}
              className="my-2 rounded img-fluid zoom-on-hover"
              variant="top"
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Originals;
