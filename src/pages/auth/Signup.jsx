import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import api from '../../api/api';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  // Real-time validation for confirm password
  useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
    } else {
      setValidationError("");
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/auth/signup', {
        userName: formData.userName,
        email: formData.email,
        password: formData.password
      });
      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/signin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>Create Account</h1>
          <p>Join us to start managing your compliance</p>
        </div>

        {error && <div className="errorMessage">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="formGrid">
            <div className="formGroup">
              <label htmlFor="userName" className="label">Username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                className="input"
                placeholder="Enter your username"
                value={formData.userName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email" className="label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="password" className="label">Password</label>
              <div className="passwordWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="visibilityToggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </button>
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="confirmPassword" className="label">Confirm Password</label>
              <div className="passwordWrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="input"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="visibilityToggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex="-1"
                >
                  {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </button>
              </div>
              {validationError && <span className="validationError">{validationError}</span>}
            </div>

            <div className="fullWidth">
              <button 
                type="submit" 
                className="button"
                disabled={loading || !!validationError}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </div>
        </form>

        <div className="footer">
          Already have an account? 
          <Link to="/signin" className="link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
