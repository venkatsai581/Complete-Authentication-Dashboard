import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      const userExists = users.some(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase()
      );

      if (!userExists) {
        setError("No account found with this email.");
        setLoading(false);
        return;
      }

      // Store email temporarily for password reset
      localStorage.setItem("resetEmail", email);

      setLoading(false);

      navigate("/reset-password");
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <h1>Forgot Password?</h1>

          <p>
            Enter your registered email to reset your password.
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              placeholder="Enter your registered email"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Checking..."
              : "Continue"}
          </Button>

        </form>

        <div className="auth-footer">
          <Link to="/login">
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;