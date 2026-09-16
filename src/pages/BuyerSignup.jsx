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
    // Password is NOT stored in localStorage.
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

        <p className="signup-subtitle">
          Create your account to start buying directly from
          farmers and verified supply partners.
        </p>

        <form onSubmit={handleSubmit}>

          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="mobile">Mobile Number</label>
          <input
            id="mobile"
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />

          <label htmlFor="repeatPassword">
            Repeat Password
          </label>
          <input
            id="repeatPassword"
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