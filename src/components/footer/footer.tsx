import "./footer.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="sb_footer section_pading">
        <div className="sb_footer-links">
          <div className="sb_footer-links_div">
            <h4>Connect with us</h4>
            <div className="socialmedia">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-telegram"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </div>
          <div className="sb_footer-links_div">
            <h4>Help</h4>
            <a href="/resource">
              <p>Term of Use</p>
            </a>
            <a href="/resource">
              <p>Help Center</p>
            </a>
            <a href="/resource">
              <p>Safety Center</p>
            </a>
          </div>
        </div>
        <hr />
        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>
              @{new Date().getFullYear()} Copyright Questify. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
