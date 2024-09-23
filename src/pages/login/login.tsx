import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import emailImage from "./images/email.png";
import passImage from "./images/lock.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/apiService";
import hidePasswordIcon from "../register/images/hide_pass.png";
import showPasswordIcon from "../register/images/show_pass.png";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userNotFound, setUserNotFound] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    const isEmailValid = email.includes("@");
    const isPasswordValid = password.length >= 6;
    if (touched.email) {
      setEmailError(isEmailValid ? "" : "Email not valid");
    }
    if (touched.password) {
      setPasswordError(
        isPasswordValid ? "" : "Password must be at least 6 characters"
      );
    }
    // setIsFormValid(isEmailValid && isFullNameValid && isPasswordValid && isJobTitleValid);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let userData = { email, password };
      await loginUser(userData);
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="logi-conteiner">
      <div className="form-center">
        <form onSubmit={handleSubmit}>
          <div className="login-form1">
            <div className="login-text">Log In</div>
            <div className="input-container1">
              <div className="input-group1">
                <div className="icon-container1">
                  <img
                    src={emailImage}
                    style={{ width: "25px", height: "25px", marginTop: "7px" }}
                  />
                </div>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setTouched((prev) => ({ ...prev, email: true }));
                  }}
                  required
                  className="text"
                  type="text"
                  style={{ marginBottom: "1em" }}
                  placeholder="Email"
                />
              </div>
              <div
                className="input-group1"
                style={{ marginTop: ".5em", marginBottom: "1em" }}
              >
                <div className="icon-container1">
                  <img
                    src={passImage}
                    style={{ width: "25px", height: "25px", marginTop: "7px" }}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setTouched((prev) => ({ ...prev, password: true }));
                  }}
                  required
                  placeholder="Password"
                  style={{ marginBottom: "1em" }}
                />
                <img
                  src={showPassword ? showPasswordIcon : hidePasswordIcon}
                  alt={showPassword ? "Hide password" : "Show password"}
                  onClick={toggleShowPassword}
                  className="show-hide-password-log"
                />
              </div>
            </div>
            <div className="login-button-container1">
              <button type="submit" className="login-button">
                Log in
              </button>
            </div>
            <div className="forgot-password-text" style={{ marginTop: ".5em" }}>
              Forgot your password?
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
