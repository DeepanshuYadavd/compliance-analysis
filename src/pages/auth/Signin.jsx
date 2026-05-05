import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import api from "../../api/api";
import "./Signin.css";
import { useAuth } from "../../context/AuthContext.jsx";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     
      // const response = await api.post('/auth/signin', formData);
      const response = await login(formData);
      if (response.status === 200) {
        alert("Signin successful!");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in</p>
        </div>

        {error && <div className="errorMessage">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email" className="label">
              Email Address
            </label>
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
            <label htmlFor="password" className="label">
              Password
            </label>
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
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="footer">
          Don't have an account?
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
