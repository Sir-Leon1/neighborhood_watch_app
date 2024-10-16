import React, { useState, useEffect } from 'react';
import { AlertCircle, Moon, Sun, Eye, EyeOff } from 'lucide-react';
import {useAuth} from "./AuthContext";

const LoginRegistrationPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();


  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password)
    }
    else {
      // Handle registration
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-header">
          <h2>{isLogin ? 'Welcome Back' : 'Join Us'}</h2>
          <button onClick={toggleDarkMode} className="toggle-dark-mode">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        {error && (
          <div className="error-alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Username"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email-address">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm Password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="user-type">User Type</label>
                <select
                  id="user-type"
                  name="userType"
                  required
                >
                  <option value="">Select User Type</option>
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="phone-no">Phone Number</label>
                <input
                  id="phone-no"
                  name="phoneNo"
                  type="tel"
                  required
                  placeholder="Phone Number"
                />
              </div>
            </>
          )}
          <button type="submit" className="submit-button">
            {isLogin ? 'Sign in' : 'Register'}
          </button>
        </form>
        <div className="form-footer">
          <button onClick={toggleForm} className="toggle-form">
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistrationPage;

const styles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f4f4f4;
    color: #333;
    transition: background-color 0.3s, color 0.3s;
  }

  body.dark-mode {
    background-color: #1a1a1a;
    color: #f4f4f4;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .form-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 400px;
    animation: fadeIn 0.5s ease-out;
  }

  body.dark-mode .form-container {
    background-color: #2a2a2a;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .toggle-dark-mode {
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
  }

  body.dark-mode .toggle-dark-mode {
    color: #f4f4f4;
  }

  .error-alert {
    display: flex;
    align-items: center;
    background-color: #ff4d4f;
    color: white;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .error-alert svg {
    margin-right: 10px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  body.dark-mode input,
  body.dark-mode select {
    background-color: #3a3a3a;
    border-color: #555;
    color: #f4f4f4;
  }

  .password-input {
    position: relative;
  }

  .toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
  }

  .submit-button {
    width: 100%;
    padding: 10px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .submit-button:hover {
    background-color: #357abd;
  }

  .form-footer {
    text-align: center;
    margin-top: 20px;
  }

  .toggle-form {
    background: none;
    border: none;
    color: #4a90e2;
    cursor: pointer;
    font-size: 14px;
  }

  body.dark-mode .toggle-form {
    color: #6ab0ff;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 480px) {
    .form-container {
      padding: 20px;
    }
  }
`;

const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);