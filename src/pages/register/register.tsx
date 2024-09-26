import "./register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailIcon from "./images/email_icon.png";
import nameIcon from "./images/name_icon.png";
import passwordIcon from "./images/password_icon.png";
import jobIcon from "./images/job_icon.png";
import hidePasswordIcon from "./images/hide_pass.png";
import showPasswordIcon from "./images/show_pass.png";
import { registerUser } from "services/apiService";
// Enum for job titles
enum JobTitles {
  Student = "Student",
  Teacher = "Teacher",
  FinanceManager = "Finance Manager",
  Engineer = "Engineer",
  BusinessAnalyst = "Business Analyst",
  Nurse = "Nurse",
  Architect = "Architect",
  Writer = "Writer",
  Electrician = "Electrician",
  Accountant = "Accountant",
  GraphicDesigner = "Graphic Designer",
}

// Array to hold job options
const jobOptions: JobTitles[] = [
  JobTitles.Student,
  JobTitles.Teacher,
  JobTitles.FinanceManager,
  JobTitles.Engineer,
  JobTitles.BusinessAnalyst,
  JobTitles.Nurse,
  JobTitles.Architect,
  JobTitles.Writer,
  JobTitles.Electrician,
  JobTitles.Accountant,
  JobTitles.GraphicDesigner,
];
const RegisterForm: React.FC = () => {
  const [Email, setEmail] = useState("");
  const [FullName, setFullName] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [Password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [JobTitle, setJobTitle] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    validateForm();
  }, [Email, FullName, Password]);

  const validateForm = () => {
    const isEmailValid = Email.includes("@");
    const isFullNameValid = FullName.length <= 20;
    const isPasswordValid = Password.length >= 6;
    const isJobTitleValid =JobTitle.length > 0;

    if (touched.email) {
      setEmailError(isEmailValid ? "" : "Email not valid");
    }

    if (touched.fullName) {
      setNameError(isFullNameValid ? "" : "Max length is 20 characters");
    }

    if (touched.password) {
      setPasswordError(
        isPasswordValid ? "" : "Password must be at least 6 characters"
      );
    }

    setIsFormValid(
      isEmailValid && isFullNameValid && isPasswordValid && isJobTitleValid
    );
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let user = { FullName, Email, Password, JobTitle };
      await registerUser(user);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-conteiner">
      <div className="center-form">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Sign Up</h2>
          <div
            className={`input-container ${emailError ? "error-visible" : ""}`}
          >
            <img src={emailIcon} alt="Email Icon" />
            <input
              type="email"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
                setTouched((prev) => ({ ...prev, email: true }));
              }}
              required
              placeholder="Email"
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>

          <div className="input-container">
            <img src={nameIcon} alt="Name Icon" />
            <input
              type="text"
              value={FullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setTouched((prev) => ({ ...prev, fullName: true }));
              }}
              required
              placeholder="Full name"
            />
            {nameError && <p className="error">{nameError}</p>}
          </div>

          <div
            className={`input-container ${
              passwordError ? "error-visible" : ""
            }`}
          >
            <img src={passwordIcon} alt="Password Icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
                setTouched((prev) => ({ ...prev, password: true }));
              }}
              required
              placeholder="Password"
            />
            <img
              src={showPassword ? showPasswordIcon : hidePasswordIcon}
              alt={showPassword ? "Hide password" : "Show password"}
              onClick={toggleShowPassword}
              className="show-hide-password"
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>

          <div className="input-container">
            <img src={jobIcon} alt="Job Icon" />
            <select
              value={JobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            >
              <option value="">Select your job title</option>
              {jobOptions.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
