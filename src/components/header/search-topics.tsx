import "./header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import ScrollEffect from "./scroll-efects";

const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const { isScrolled } = ScrollEffect();

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim().length >= 3) {
      const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
      navigate(`/topics?query=${encodedSearchTerm}`);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter at least 3 characters.");
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.trim().length >= 3) {
        setErrorMessage("");
      }
    }, 300),
    []
  );

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  const handleSearchIconClick = () => {
    handleSearch(searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    setSearchTerm("");
    setErrorMessage("");
  }, [location]);

  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <div
        className={`search-container ${
          location.pathname === "/home" ? "search-container-home" : ""
        } ${isScrolled && location.pathname === "/home" ? "scrolled" : ""}`}
      >
        <div className="search-icon" onClick={handleSearchIconClick}>
          <i className="fas fa-search"></i>
        </div>
        <input
          type="text"
          placeholder="Search something"
          aria-label="Search"
          className="search-input"
          value={searchTerm}
          onChange={handleInputChange}
          id="search-input"
          name="search"
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </form>
  );
}
