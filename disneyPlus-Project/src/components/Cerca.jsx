import { useEffect, useState } from "react";
import { Card, Col, Container, Form, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_CAPAMERICA,
  SET_IRONMAN,
  SET_SPIDERMAN,
  findFilmFetch,
  searchFetch,
} from "../redux/action";
import { useNavigate } from "react-router-dom";

function Cerca() {
  const [searchInput, setSearchInput] = useState("");

  const search = useSelector((state) => state.find.film);

  const TOKEN_API =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTc1YWEzMWQzZDk2ZDJkNjQwMzczODliZDAyNDc5ZCIsIm5iZiI6MTcxNzQwMzExMC45OTEwMDAyLCJzdWIiOiI2NjVkN2RlNjUxZmQ5OGZiNTcyMzI1MWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s6W_nERiypsdOzk9jAF68sajHIuB2pshwNNghSa3Ax4";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(findFilmFetch(TOKEN_API, searchInput));
  };

  const dispatch = useDispatch();
  const spiderman = useSelector((state) => state.search.spiderman);
  const ironMan = useSelector((state) => state.search.ironMan);
  const capAmerica = useSelector((state) => state.search.capAmerica);

  const navigate = useNavigate();

  const handleClick = (value, item) => {
    const routeType = item.media_type === "Serie" ? "Serie" : "film";
    navigate(`/${routeType}/${value}`, { state: item });
  };

  useEffect(() => {
    dispatch(searchFetch("spiderman", TOKEN_API, SET_SPIDERMAN));
    dispatch(searchFetch("iron man", TOKEN_API, SET_IRONMAN));
    dispatch(searchFetch("captain America", TOKEN_API, SET_CAPAMERICA));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const years = (value) => {
    const y = new Date(value);
    let year = y.getFullYear();

    return year;
  };

  const getYears = (release, year) => {
    if (release) {
      const annoRilascio = years(release);
      return annoRilascio > year;
    }
  };

  return (
    <>
      <Container fluid>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12}>
              <FormControl
                type="text"
                placeholder="Titolo, personaggio o genere "
                className=" mr-sm-2 fs-4 fst-italic"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{ height: "80px", borderRadius: "0" }}
              />
            </Col>
          </Row>
        </Form>
      </Container>
      <Container fluid className="text-white mt-5">
        {search.length > 0 ? (
          <Row>
            <h3 className="mt-4 ms-4">Risultati per: "{searchInput}"</h3>
            {search.map((item, index) => (
              <Col key={index} xs={12} md={3}>
                <Card.Img
                  onClick={() =>
                    handleClick(
                      (item.title || item.name).replace(/\s+/g, "_"),
                      item
                    )
                  }
                  style={{
                    cursor: "pointer",
                    height: "200px",
                    objectFit: "contain",
                  }}
                  className="my-2 rounded pointer img-fluid zoom-on-hover"
                  variant="top"
                  src={`https://image.tmdb.org/t/p/original${
                    item.backdrop_path || item.poster_path
                  }`}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <>
            <Row>
              <h3 className="mt-4 ms-4">Captain America</h3>
              {capAmerica.results
                ?.slice(0, 6)
                .filter((item) => getYears(item.release_date, 2010))
                .map((item, index) => (
                  <Col key={index} xs={12} md={3}>
                    <Card.Img
                      onClick={() =>
                        handleClick(item.title.replace(/\s+/g, "_"), item)
                      }
                      style={{
                        cursor: "pointer",
                        height: "200px",
                        objectFit: "contain",
                      }}
                      className="my-2 rounded pointer img-fluid zoom-on-hover"
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500${
                        item.backdrop_path || item.poster_path
                      }`}
                    />
                  </Col>
                ))}
            </Row>
            <Row>
              <h3 className="mt-4 ms-4">Spider man</h3>
              {spiderman.results
                ?.slice(12, 16)
                .filter((item) => getYears(item.release_date, 2000))
                .map((item, index) => (
                  <Col key={index} xs={12} md={3}>
                    <Card.Img
                      onClick={() =>
                        handleClick(item.title.replace(/\s+/g, "_"), item)
                      }
                      style={{
                        cursor: "pointer",
                        height: "200px",
                        objectFit: "contain",
                      }}
                      className="my-2 rounded pointer img-fluid zoom-on-hover"
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500${
                        item.backdrop_path || item.poster_path
                      }`}
                    />
                  </Col>
                ))}
            </Row>
            <Row>
              <h3 className="mt-4 ms-4">Iron Man</h3>
              {ironMan.results
                ?.slice(4, 11)
                .filter((item) => getYears(item.release_date, 2007))
                .map((item, index) => (
                  <Col key={index} xs={12} md={3}>
                    <Card.Img
                      onClick={() =>
                        handleClick(item.title.replace(/\s+/g, "_"), item)
                      }
                      style={{
                        cursor: "pointer",
                        height: "200px",
                        objectFit: "contain",
                      }}
                      className="my-2 rounded pointer img-fluid zoom-on-hover"
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500${
                        item.backdrop_path || item.poster_path
                      }`}
                    />
                  </Col>
                ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default Cerca;
