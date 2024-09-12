import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    if (searchTerm.trim()) {
      navigate(`/topic-list?query=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <div className="nav-container">
      <div className="navbar-custom">
        <div className="container">
          <Link to="/home" className="site-name">
            Questify
          </Link>
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <div className="search-container">
              <div className="search-icon">
                <i className="fas fa-search"></i>
              </div>
              <input
                type="text"
                placeholder="Ask something"
                aria-label="Search"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          <div className="btn-custom">
            <Link to="/login" className="btn-login">
              Log In
            </Link>
            <Link to="/register" className="btn-signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
