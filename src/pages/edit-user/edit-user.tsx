import React, { useState, useEffect } from "react";
import "./edit-user.css";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateUser } from "../../services/apiService";

const EditProfile: React.FC = () => {
  const [Name, setUsername] = useState<any>(null);
  const [Email, setEmail] = useState<any>(null);
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = localStorage.getItem("currentUser");
        const resp = await getCurrentUser();
        if (resp) {
          setUsername(resp.currentUser);
          setEmail(resp.currentUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (NewPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    const updatedUser = {
      Name,
      Email,
      CurrentPassword,
      NewPassword,
    };

    try {
      await updateUser(updatedUser);
      console.log("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile");
    }
  };

  return (
    <div className="edit-form-center">
      <form className="edit-form" onSubmit={handleSubmit}>
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
              placeholder={Name && Name.name}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <h2>Change email</h2>
          <div className="input-group">
            <input
              type="email"
              placeholder={Email && Email.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <h2>Change password</h2>
          <div className="input-group">
            <input
              type="password"
              value={CurrentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current password"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              value={NewPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
