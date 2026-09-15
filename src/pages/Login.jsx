import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");

  function handleLogin(event) {
    event.preventDefault();

    console.log({
      email,
      password,
      role,
    });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label>Login as</label>

            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="supply-partner">Supply Partner</option>
            </select>
          </div>

          <button className="login-button" type="submit">
            Login
          </button>
          <p className="log_para">
            Don't have an account?{" "}
            <Link to="/buyer-signup" className="r2b">Register as Buyer</Link>
        </p>

        <p className="log_para">
            Are you a seller?{" "}
            <Link to="/seller-register" className="r2b">Register as Seller</Link>
        </p>
        <p className="log_para">
            Are you a supply-chain partner?{" "}
            <Link to="/supply-partner-register" className="r2b">Register as Supply Partner</Link>
        </p>
          
          
        </form>

        <div className="forgot-password">
          <button type="button">Forgot Password?</button>
        </div>
        
      </div>
    </div>
  );
}

export default Login;