import "./header.css";
import { Link } from "react-router-dom";
import SearchTopics from "./search-topics";

export default function Header() {
  return (
    <div className="nav-container">
      <div className="navbar-custom">
        <div className="container">
          <Link to="/home" className="site-name">
            Questify
          </Link>
          <SearchTopics />
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
