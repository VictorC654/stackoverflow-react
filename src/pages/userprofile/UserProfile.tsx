import React, { useEffect, useState } from "react";
import "./userprofile.css";
import { getCurrentUser } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/apiService";
const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("answers");
  const logout = () => {
    logoutUser();
    navigate("/home");
  };
  useEffect(() => {
    localStorage.removeItem("topicComments");
    const fetchUser = async () => {
      try {
        const resp = await getCurrentUser();
        if (resp) {
          setUser(resp.currentUser);
        } else {
          console.warn("User data is null or undefined");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser().then((r) => {});
  }, []);
  return (
    <div className="user-profile-container-center">
      <div className="user-profile-container">
        <div className="action-buttons">
          {/*<button*/}
          {/*  className="edit-profile-button"*/}
          {/*  onClick={() => navigate("/edit")}*/}
          {/*>*/}
          {/*  Edit profile*/}
          {/*</button>*/}
          <button className="logout-profile-button" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="user-profile-top-container">
          <div className="user-profile-pic">
            <i className="fa fa-user" aria-hidden="true"></i>
          </div>
          <div className="user-profile-info-container">
            <div className="user-profile-info-name">{user && user.name}</div>
            <div className="user-profile-info-desc">
              <div className="user-profile-info-desc-section">
                <i className="fa-solid fa-cake-candles"></i>
                Member for 11 days
              </div>
              <div className="user-profile-info-desc-section">
                <i className="fa-regular fa-clock"></i>
                Last seen this week
              </div>
              <div className="user-profile-info-desc-section">
                <i className="fa-solid fa-calendar-days"></i>
                Visited 7 days in a row
              </div>
            </div>
            <div className="aqr-container">
              <button
                className={
                  section === "answers"
                    ? "aqr-progress-button aqr-progress-active"
                    : "aqr-progress-button"
                }
                onClick={() => setSection("answers")}
              >
                Answers (2)
              </button>
              <button
                className={
                  section === "questions"
                    ? "aqr-progress-button aqr-progress-active"
                    : "aqr-progress-button"
                }
                onClick={() => setSection("questions")}
              >
                Questions (0)
              </button>
              <button
                className={
                  section === "reputation"
                    ? "aqr-progress-button aqr-progress-active"
                    : "aqr-progress-button"
                }
                onClick={() => setSection("reputation")}
              >
                Reputation
              </button>
            </div>
          </div>
        </div>
        <div className="aqr-cards-container">
          {section === "answers" && (
            <>
              <div className="answers-card">
                <div className="answers-card-user-profile">
                  <div className="answers-card-user-pic">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </div>
                  <div className="answers-card-user-name">Alt user</div>
                </div>
                <div className="answers-card-short-desc">
                  ai dount anderstand :((
                </div>
                <div className="answers-card-rating">
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
              <div className="answers-card">
                <div className="answers-card-user-profile">
                  <div className="answers-card-user-pic">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </div>
                  <div className="answers-card-user-name">Another user</div>
                </div>
                <div className="answers-card-short-desc">ai anderstand :)</div>
                <div className="answers-card-rating">
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>
              <div className="aqr-read-more">Read more</div>
            </>
          )}
          {section === "questions" && (
            <>
              <div className="questions-card">
                <div className="questions-card-title">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <div className="questions-card-short-desc">
                  Duis in odio vel tortor ullamcorper placerat. Aliquam erat
                  volutpat. Suspendisse id tortor eget nulla congue pretium
                  rhoncus quis odio.
                </div>
                <div className="answers-card-answers-number">10 answers</div>
              </div>
              <div className="aqr-read-more">Read more</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
