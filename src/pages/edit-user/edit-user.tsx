import React, { useState, useEffect } from "react";
import "./edit-user.css";
import { useNavigate } from "react-router-dom";

const EditProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="edit-form-center">
      <form className="edit-form">
        <button
          type="button"
          className="profile-button"
          onClick={() => navigate("/profile")}
        >
          View profile
        </button>
        <div className="profile-header">
          <div className="profile-user">
            <i className="fa fa-user" aria-hidden="true"></i>
          </div>
        </div>
        <div className="conteiner-input">
          <h2>Change name</h2>
          <div className="input-group">
            <input
              type="text"
              value={username}
              placeholder="Enter name"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <h2>Change email</h2>
          <div className="input-group">
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <h2>Change password</h2>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Current password"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="New password"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
            />
          </div>
        </div>
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
