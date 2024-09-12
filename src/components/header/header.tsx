import "./header.css";

export default function Header() {
  return (
    <div className="nav-container">
      <div className="navbar-custom">
        <div className="container">
          <div className="site-name">Questify</div>
          <form className="search-form">
            <div className="search-container">
              <div className="search-icon">
                <i className="fas fa-search"></i>
              </div>
              <input
                type="text"
                placeholder="Ask something"
                aria-label="Search"
                className="search-input"
              />
            </div>
          </form>
          <div className="btn-custom">
            <button className="btn-login">Log In</button>
            <button className="btn-signup">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
