import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

function MyNavBar() {
  const location = useLocation();

  const check = (path) => {
    if (path === "/") {
      return location.pathname === "/" ? "nav-link text-white" : "nav-link";
    }
    return location.pathname.startsWith(path)
      ? "nav-link text-white"
      : "nav-link";
  };

  return (
    <Navbar expand="lg" className="d-flex">
      <Container fluid>
        <NavLink to={"/"}>
          <img src="/src/assets/logo.png" width={100} alt="" className="me-2" />
        </NavLink>
        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink
              to={"/"}
              className={` ${check(
                "/"
              )} nav-link me-2 mt-3 fs-5 text-secondary`}
            >
              Home
            </NavLink>
            <NavLink
              to={"/cerca"}
              className={` ${check(
                "/cerca"
              )} nav-link me-2 mt-3 fs-5 text-secondary`}
            >
              Cerca
            </NavLink>
            <NavLink
              to={"/laTuaLista"}
              className={` ${check(
                "/laTuaLista"
              )} nav-link me-2 mt-3 fs-5 text-secondary`}
            >
              La tua lista
            </NavLink>
            <NavLink
              to={"/Film"}
              className={` ${check(
                "/Film"
              )} nav-link me-2 mt-3 fs-5 text-secondary`}
            >
              Film
            </NavLink>
            <NavLink
              to={"/Serie"}
              className={` ${check(
                "/Serie"
              )} nav-link me-2 mt-3 fs-5 text-secondary`}
            >
              Serie
            </NavLink>
            <NavLink
              to={"/Originals"}
              className={` ${check(
                "/Originals"
              )} nav-link me-2 mt-3 fs-5 text-secondary`}
            >
              Originals
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
