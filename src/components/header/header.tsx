import "./header.css";
import { Link, useLocation } from "react-router-dom";
import SearchTopics from "./search-topics";
import { useState, useEffect } from "react";
import ScrollEffect from "./scroll-efects";
import { checkIfUserLoggedIn } from "../../services/apiService";

export default function Header() {
  const location = useLocation();
  const { isScrolled } = ScrollEffect();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={`nav-container`}>
      <div
        className={`navbar-custom ${
          location.pathname === "/home" ? "navbar-home" : ""
        } ${isScrolled && location.pathname === "/home" ? "scrolled" : ""}`}
      >
        <div className="container">
          <Link
            to="/home"
            className={`site-name ${
              location.pathname === "/home" ? "site-name-home" : ""
            } ${isScrolled && location.pathname === "/home" ? "scrolled" : ""}`}
          >
            Questify
          </Link>
          <SearchTopics />
          <div className="btn-custom">
            {checkIfUserLoggedIn("currentUser") ? (
              <>
                <Link to="/home" className="btn-question">
                  Ask Question
                </Link>
                <Link to="/profile" className="btn-profile">
                  <div className="profile">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">
                  Log In
                </Link>
                <Link to="/register" className="btn-signup">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
