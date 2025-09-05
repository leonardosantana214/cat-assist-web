import React, { useState, useEffect } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../../services/firebase/firebase";
import "./style.css";
import { onAuthStateChanged } from "firebase/auth";
import IntersectionObserverComponent from "../../animation/useIntersectionObserver";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [SignedUser, setUser] = useState(null); // Initialize as null to check for login status
  const [loading, setLoading] = useState(true); // Loading state to handle waiting

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(auth.currentUser);
      setLoading(false);
    });

    if (location.pathname === "/") {
      window.scrollTo(0, 0); // Move the scroll to the top
    }
  }, [location]);

  // Toggle dropdown
  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  // Navigation handler
  const handleNavigation = (e, path, sectionId) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView();
      }
    } else {
      navigate(path);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <IntersectionObserverComponent>
      <nav
        expand="lg"
        className="custom-navbar align-items-center justify-content-between w-100 "
        variant="dark"
        id="navbar-responsive"
      >
        <Dropdown
          className="hamburger-dropdown"
          show={showDropdown}
          onToggle={toggleDropdown}
        >
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-basic"
            onClick={toggleDropdown}
            className="hamburger-toggle"
          >
            ☰
          </Dropdown.Toggle>

          <Dropdown.Menu className="custom-dropdown-menu" id="dropdown-menu">
            <Dropdown.Item
              href="#home"
              onClick={(e) => handleNavigation(e, "/", "#home")}
            >
              HOME
            </Dropdown.Item>
            <Dropdown.Item
              href="/#atendimento"
              onClick={(e) => handleNavigation(e, "/", "#atendimento")}
            >
              ATENDIMENTOS
            </Dropdown.Item>
            <Dropdown.Item
              href="/#sobre-nos"
              onClick={(e) => handleNavigation(e, "/", "#sobre-nos")}
            >
              SOBRE NÓS
            </Dropdown.Item>
            <Dropdown.Item>
              {SignedUser ? (
                <Link className="nav-link" to="/perfil">
                  PERFIL
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  LOGIN
                </Link>
              )}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Nav className="w-100 align-items-center" id="nav-left-right">
          <Nav.Link
            className="nav-link"
            href="#home"
            onClick={(e) => handleNavigation(e, "/", "#home")}
          >
            <span>HOME</span>
          </Nav.Link>
          <Nav.Link
            className="nav-link"
            onClick={(e) => handleNavigation(e, "/", "#atendimento")}
          >
            <span>ATENDIMENTOS</span>
          </Nav.Link>
          <div className="navbar-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/20/Logo_SESI_vermelho.jpg"
              alt="SESI Logo"
              className="sesi-logo"
            />
          </div>
          <Nav.Link
            className="nav-link"
            onClick={(e) => handleNavigation(e, "/sobre-nos", "#sobre-nos")}
          >
            <span>SOBRE NÓS</span>
          </Nav.Link>
          {SignedUser ? (
            <Link className="nav-link" to="/perfil">
              <span>PERFIL</span>
            </Link>
          ) : (
            <Link className="nav-link" to="/login">
              <span>LOGIN</span>
            </Link>
          )}
        </Nav>
      </nav>
    </IntersectionObserverComponent>
  );
};

export default Header;
