import { useState } from "react";
import { Link } from "react-router-dom";
import { supplyPartner } from "../data/supplyPartner";
import "./SupplyPartnerProfile.css";

function SupplyPartnerProfile() {
  const [profile, setProfile] = useState(supplyPartner);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: profile.name,
    contactPerson: profile.contactPerson,
    role: profile.role,
    email: profile.email,
    mobile: profile.mobile,
    location: profile.location,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();

    setProfile({
      ...profile,
      ...formData,
    });

    setIsEditing(false);

    alert("Profile updated successfully!");
  }

  function handleEdit() {
    setFormData({
      name: profile.name,
      contactPerson: profile.contactPerson,
      role: profile.role,
      email: profile.email,
      mobile: profile.mobile,
      location: profile.location,
    });

    setIsEditing(true);
  }

  return (
    <div className="supply-profile-page">

      {/* HEADER */}

      <header className="supply-profile-header">

        <div>
          <Link
            to="/supply-partner-dashboard"
            className="supply-profile-back"
          >
            ← Dashboard
          </Link>

          <p className="supply-profile-eyebrow">
            SUPPLY PARTNER
          </p>

          <h1>Profile</h1>

          <p className="supply-profile-subtitle">
            Manage your supply partner information and verification.
          </p>
        </div>

        {!isEditing && (
          <button
            className="profile-edit-button"
            onClick={handleEdit}
          >
            <span className="material-symbols-outlined">
              edit
            </span>
            Edit Profile
          </button>
        )}

      </header>

      {isEditing ? (

        /* EDIT FORM */

        <section className="profile-card">

          <div className="profile-card-header">
            <div>
              <p>PROFILE INFORMATION</p>
              <h2>Edit Profile</h2>
            </div>
          </div>

          <form onSubmit={handleSave}>

            <div className="profile-form-row">

              <div className="profile-form-group">
                <label>Company / Person Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-form-group">
                <label>Contact Person</label>

                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="profile-form-row">

              <div className="profile-form-group">
                <label>Partner Type</label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option>
                    Aggregator / Collection Center
                  </option>

                  <option>
                    Processor / Grader / Packer
                  </option>

                  <option>
                    Warehouse / Cold Storage
                  </option>

                  <option>
                    Logistics / Distribution Partner
                  </option>
                </select>
              </div>

              <div className="profile-form-group">
                <label>Mobile Number</label>

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="profile-form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="profile-form-group">
              <label>Operating Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="profile-form-actions">

              <button
                type="button"
                className="profile-cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="profile-save-button"
              >
                Save Changes
              </button>

            </div>

          </form>

        </section>

      ) : (

        /* PROFILE VIEW */

        <>

          <section className="profile-card">

            <div className="profile-card-header">

              <div className="profile-heading">

                <div className="profile-avatar">
                  {profile.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div>
                  <p>PARTNER ACCOUNT</p>
                  <h2>{profile.name}</h2>
                  <span>{profile.role}</span>
                </div>

              </div>

            </div>

            <div className="profile-information">

              <div className="profile-info-item">
                <span>CONTACT PERSON</span>
                <strong>{profile.contactPerson}</strong>
              </div>

              <div className="profile-info-item">
                <span>EMAIL</span>
                <strong>{profile.email}</strong>
              </div>

              <div className="profile-info-item">
                <span>MOBILE NUMBER</span>
                <strong>{profile.mobile}</strong>
              </div>

              <div className="profile-info-item">
                <span>PARTNER TYPE</span>
                <strong>{profile.role}</strong>
              </div>

              <div className="profile-info-item full-width">
                <span>OPERATING LOCATION</span>

                <strong>
                  <span className="material-symbols-outlined">
                    location_on
                  </span>

                  {profile.location}
                </strong>
              </div>

            </div>

          </section>


          <section className="profile-card">

            <div className="profile-card-header">
              <div>
                <p>AUTHENTICATION</p>
                <h2>Verification Status</h2>
              </div>
            </div>

            <div className="verification-list">

              <div className="verification-item">

                <div className="verification-icon">
                  <span className="material-symbols-outlined">
                    verified
                  </span>
                </div>

                <div>
                  <strong>Trade License</strong>
                  <p>
                    Business registration document
                  </p>
                </div>

                <span className="verified-badge">
                  Verified
                </span>

              </div>

              <div className="verification-item">

                <div className="verification-icon">
                  <span className="material-symbols-outlined">
                    verified
                  </span>
                </div>

                <div>
                  <strong>FSSAI Registration</strong>
                  <p>
                    Food safety registration
                  </p>
                </div>

                <span className="verified-badge">
                  Verified
                </span>

              </div>

            </div>

          </section>

        </>

      )}

    </div>
  );
}

export default SupplyPartnerProfile;