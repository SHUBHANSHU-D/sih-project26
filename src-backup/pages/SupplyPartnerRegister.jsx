import { useState } from "react";
import { Link } from "react-router-dom";
import "./SupplyPartnerRegister.css";

function SupplyPartnerRegister() {
  const [section, setSection] = useState(1);

  const [formData, setFormData] = useState({
    partnerType: "",
    companyName: "",
    contactPerson: "",
    mobileNumber: "",
    workPhone: "",
    description: "",

    email: "",
    password: "",
    repeatPassword: "",

    photo: null,
    tradeLicense: null,
    fssaiRegistration: null,

    address: "",
  });

  function handleChange(event) {
    const { name, value, files } = event.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  }

  function nextSection() {
    if (section < 3) {
      setSection(section + 1);
    }
  }

  function previousSection() {
    if (section > 1) {
      setSection(section - 1);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Supply Partner Registration:", formData);

    alert("Registration submitted successfully!");
  }

  return (
    <div className="supply-register-container">
      <div className="supply-register-box">

        <h1>Supply Partner Registration</h1>

        <p className="register-subtitle">
          Join the agricultural supply network
        </p>

        {/* Progress */}
        <div className="progress">
          <div className={section >= 1 ? "active-step" : ""}>
            1. Information
          </div>

          <div className={section >= 2 ? "active-step" : ""}>
            2. Verification
          </div>

          <div className={section >= 3 ? "active-step" : ""}>
            3. Other
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* SECTION 1 */}
          {section === 1 && (
            <div className="form-section">

              <h2>Information</h2>

              <label>Supply Chain Role</label>

              <select
                name="partnerType"
                value={formData.partnerType}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select your supply-chain role
                </option>

                <option value="aggregator">
                  Aggregator / Collection Center
                </option>

                <option value="processor">
                  Processor / Grader / Packer
                </option>

                <option value="warehouse">
                  Warehouse / Cold Storage
                </option>

                <option value="logistics">
                  Logistics / Distribution Partner
                </option>
              </select>

              <label>Company / Organization Name</label>

              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company or organization name"
                required
              />

              <label>Contact Person</label>

              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Enter contact person's name"
                required
              />

              <label>Mobile Number</label>

              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
              />

              <label>Work Phone Number</label>

              <input
                type="tel"
                name="workPhone"
                value={formData.workPhone}
                onChange={handleChange}
                placeholder="Enter work phone number"
              />

              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the service you provide in the supply chain"
                rows="4"
              />

              <button
                type="button"
                onClick={nextSection}
              >
                Next
              </button>

            </div>
          )}

          {/* SECTION 2 */}
          {section === 2 && (
            <div className="form-section">

              <h2>Authentication & Verification</h2>

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
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
                placeholder="Repeat password"
                required
              />

              <label>Photo</label>

              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                required
              />

              <label>Trade License</label>

              <input
                type="file"
                name="tradeLicense"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
                required
              />

              <label>FSSAI Registration</label>

              <input
                type="file"
                name="fssaiRegistration"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
                required
              />

              <div className="button-row">

                <button
                  type="button"
                  onClick={previousSection}
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={nextSection}
                >
                  Next
                </button>

              </div>

            </div>
          )}

          {/* SECTION 3 */}
          {section === 3 && (
            <div className="form-section">

              <h2>Other Information</h2>

              <label>Business / Operating Address</label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your business or operating address"
                rows="5"
                required
              />

              <div className="button-row">

                <button
                  type="button"
                  onClick={previousSection}
                >
                  Previous
                </button>

                <button type="submit">
                  Submit Registration
                </button>

              </div>

            </div>
          )}

        </form>

        <p className="login-link">
          Already registered?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default SupplyPartnerRegister;