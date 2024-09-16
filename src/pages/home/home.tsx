import "./home.css";
import heroImage from "./images/hero-image.png";
import explore from "./images/explore.png";
import share from "./images/share.png";
import collaborate from "./images/colaborate.png";
import ask from "./images/ask.png";
import boxImage from "./images/pink.png";

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <div className="hero-container">
        <div className="hero-content">
          <div className="text-content">
            <h1>We have any answer!</h1>
            <p>
              Discover Answers to Any Question – From Everyday Curiosities to
              Complex Queries.
            </p>
            <button className="cta-button">Recent Question</button>
          </div>
          <div className="image-content">
            <img src={heroImage} alt="Hero visual representation" />
          </div>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="info-section-conteiner">
        <div className="info-section">
          <div className="info-box">
            <div className="image-circle">
              <img src={explore} alt="Explore" />
            </div>
            <h1>Explore</h1>
            <p>Easily browse topics and find the solutions you need.</p>
          </div>
          <div className="info-box">
            <div className="image-circle">
              <img src={share} alt="Share" />
            </div>
            <h1>Share</h1>
            <p>
              Share knowledge and grow your expertise with every interaction.
            </p>
          </div>
          <div className="info-box">
            <div className="image-circle">
              <img src={collaborate} alt="Collaborate" />
            </div>
            <h1>Collaborate</h1>
            <p>Collaborate with a community of developers and professionals.</p>
          </div>
          <div className="info-box">
            <div className="image-circle">
              <img src={ask} alt="Ask" />
            </div>
            <h1>Ask</h1>
            <p>Ask questions and get answers quickly from experts.</p>
          </div>
        </div>

        {/* ADVANCE SECTION */}
        <div className="advance-box">
          <div className="box-image">
            <img src={boxImage} alt="Question" />
          </div>
          <div className="text-content-adv">
            <h1>
              Our platform offers fast and reliable solutions, helping you solve
              problems efficiently.
            </h1>
            <p>
              With an active and supportive community, you’ll always find expert
              advice and guidance.
            </p>
          </div>
        </div>

        {/* COMMENTS SECTION */}
        <div className="com-section-conteiner">
          <div className="com-section">
            <div className="com-box1">
              <div className="user">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <p>
                "This platform makes problem-solving so much
                <strong> easier</strong>. I found answers to my questions within
                minutes!"
              </p>
            </div>
            <div className="com-box2">
              <div className="user">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <p>
                "The interface is intuitive and easy to navigate. Finding the
                <strong> right information</strong> has never been this simple."
              </p>
            </div>
            <div className="com-box3">
              <div className="user">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <p>
                "I appreciate how <strong> fast the responses</strong> are. It
                feels like you’re always connected to experts ready to help."
              </p>
            </div>
            <div className="com-box4">
              <div className="user">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <p>
                "This site has become my<strong> go-to resource</strong> for
                coding and tech-related questions. Highly recommend it to
                anyone! The wealth of knowledge shared here is unmatched."
              </p>
            </div>
            <div className="com-box5">
              <div className="user">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <p>
                "I love the community here. Everyone is so helpful, and I’ve
                <strong> learned so much</strong> just by reading through the
                discussions."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
