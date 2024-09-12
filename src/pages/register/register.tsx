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
      setNameError(isFullNameValid ? '' : 'Max length is 20s');
    }

    if (touched.password) {
      setPasswordError(isPasswordValid ? '' : 'Password must be at least 6 characters');
    }

    setIsFormValid(isEmailValid && isFullNameValid && isPasswordValid && isJobTitleValid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      navigate('/home');
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

        <div className="input-container"  style={{ position: 'relative' }}>
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
            style={{
              position: 'absolute',
              right: '10px',
              top: '25%',
              transform: 'translateX(2010%)',
              cursor: 'pointer',
              height: '24px'
            }}
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
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Finance Manager">Finance Manager</option>
            <option value="Engineer">Engineer</option>
            <option value="Business Analyst">Business Analyst</option>
            <option value="Nurse">Nurse</option>
            <option value="Architect">Architect</option>
            <option value="Writer">Writer</option>
            <option value="Electrician">Electrician</option>
            <option value="Accountant">Accountant</option>
            <option value="Graphic Designer">Graphic Designer</option>
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
