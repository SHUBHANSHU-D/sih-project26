import { useState } from "react";
import { Link } from "react-router-dom";
import "./BuyerSignup.css";

function BuyerSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    repeatPassword: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
  event.preventDefault();

  if (formData.password !== formData.repeatPassword) {
    alert("Passwords do not match");
    return;
  }

  // Save buyer profile information
  const buyerProfile = {
    name: formData.name,
    email: formData.email,
    mobile: formData.mobile,
    role: "Buyer",
    createdAt: new Date().toLocaleDateString("en-IN"),
  };

  localStorage.setItem(
    "buyerProfile",
    JSON.stringify(buyerProfile)
  );

  alert("Account created successfully!");
}

  return (
    <div className="buyer-signup-container">
      <div className="buyer-signup-box">

        <h1>Buyer Sign Up</h1>
        <br></br>

        <p className="signup-subtitle">
          Create your account to start buying directly from sellers.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />

          <label>Repeat Password</label>
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            placeholder="Repeat your password"
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default BuyerSignup;