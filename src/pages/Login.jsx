import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    // Temporary frontend login.
    // Real authentication will be handled by the backend later.

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);

    if (role === "buyer") {
      navigate("/buyer-dashboard");
    } else if (role === "supply-partner") {
      navigate("/supply-partner-dashboard");
    } else if (role === "logistics-partner") {
      navigate("/logistics-dashboard");
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        {/* BRAND */}
        <div className="login-brand">

          <div className="login-brand-icon">
            🌾
          </div>

          <div>
            <h1>सीधा-SAUDA</h1>
            <p>किसान से सीधे बाजार तक</p>
          </div>

        </div>

        {/* HEADING */}
        <div className="login-heading">

          <p>WELCOME BACK</p>

          <h2>Sign in to your account</h2>

          <span>
            Access your सीधा-SAUDA dashboard.
          </span>

        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>

          {/* ROLE */}
          <div className="form-group">

            <label htmlFor="role">
              Login As
            </label>

            <select
              id="role"
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
            >

              <option value="buyer">
                Buyer
              </option>

              <option value="supply-partner">
                Supply Partner
              </option>

              <option value="logistics-partner">
                Logistics Partner
              </option>

            </select>

          </div>

          {/* EMAIL */}
          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>

          {/* PASSWORD */}
          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>

          {/* FORGOT PASSWORD */}
          <div className="forgot-password">

            <button
              type="button"
              onClick={() =>
                alert("Password recovery will be connected to the backend later.")
              }
            >
              Forgot Password?
            </button>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="login-button"
          >
            Sign In
          </button>

        </form>

        {/* REGISTER LINKS */}
        <div className="login-register">

          <p className="log_para">
            Don't have a buyer account?{" "}
            <Link
              to="/buyer-signup"
              className="r2b"
            >
              Register as Buyer
            </Link>
          </p>

          <p className="log_para">
            Are you a supply-chain partner?{" "}
            <Link
              to="/supply-partner-register"
              className="r2b"
            >
              Register as Supply Partner
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;