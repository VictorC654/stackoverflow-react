import './register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailIcon from './email_icon.png';
import nameIcon from './name_icon.png';
import passwordIcon from './password_icon.png';
import jobIcon from './job_icon.png';
import hidePasswordIcon from './hide_pass.png';
import showPasswordIcon from './show_pass.png';

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
  GraphicDesigner = "Graphic Designer"
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
  JobTitles.GraphicDesigner
];

// Simulate API request
const simulateApiRequest = async (formData: any) => {
  // Simulates an API call
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      // Simulate a success response
      resolve({ success: true });
    }, 1000); // Delay for simulation (1 second)
  });
};

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    validateForm();
  }, [email, fullName, password, jobTitle]);

  const validateForm = () => {
    const isEmailValid = email.includes('@');
    const isFullNameValid = fullName.length <= 20;
    const isPasswordValid = password.length >= 6;
    const isJobTitleValid = jobTitle.length > 0;

    if (touched.email) {
      setEmailError(isEmailValid ? '' : 'Email not valid');
    }

    if (touched.fullName) {
      setNameError(isFullNameValid ? '' : 'Max length is 20 characters');
    }

    if (touched.password) {
      setPasswordError(isPasswordValid ? '' : 'Password must be at least 6 characters');
    }

    setIsFormValid(isEmailValid && isFullNameValid && isPasswordValid && isJobTitleValid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Simulate API request
      const response = await simulateApiRequest({
        email,
        fullName,
        password,
        jobTitle
      });

      // Check API response and navigate
      if (response.success) {
        navigate('/login');
      } else {
        // Handle API failure
        console.error('API request failed');
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="center-form">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Sign Up</h2>
        <div className="input-container">
          <img src={emailIcon} alt="Email Icon" />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setTouched(prev => ({ ...prev, email: true }));
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
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setTouched(prev => ({ ...prev, fullName: true }));
            }}
            required
            placeholder="Full name"
          />
          {nameError && <p className="error">{nameError}</p>}
        </div>

        <div className="input-container" style={{ position: 'relative' }}>
          <img src={passwordIcon} alt="Password Icon" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setTouched(prev => ({ ...prev, password: true }));
            }}
            required
            placeholder="Password"
          />
          <img
            src={showPassword ? showPasswordIcon : hidePasswordIcon}
            alt={showPassword ? 'Hide password' : 'Show password'}
            onClick={toggleShowPassword}
            className="show-hide-password"
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>

        <div className="input-container">
          <img src={jobIcon} alt="Job Icon" />
          <select
            value={jobTitle}
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
          disabled={!isFormValid}
          className={isFormValid ? 'btn-active' : 'btn-inactive'}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
