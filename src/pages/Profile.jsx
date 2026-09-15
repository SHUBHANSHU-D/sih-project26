import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { orders } = useOrders();

  useEffect(() => {
    const savedProfile = localStorage.getItem("buyerProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  if (!profile) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <div className="profile-empty-icon">👤</div>

          <h2>No Profile Found</h2>

          <p>
            Please create a buyer account first.
          </p>

          <Link
            to="/buyer-signup"
            className="profile-primary-button"
          >
            Create Buyer Account
          </Link>
        </div>
      </div>
    );
  }

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "B";

  function handleSaveChanges(event) {
    event.preventDefault();

    const updatedProfile = {
      ...profile,
      name: event.target.name.value,
      email: event.target.email.value,
      mobile: event.target.mobile.value,
      address: event.target.address.value,
      city: event.target.city.value,
      state: event.target.state.value,
      pincode: event.target.pincode.value,
    };

    localStorage.setItem(
      "buyerProfile",
      JSON.stringify(updatedProfile)
    );

    setProfile(updatedProfile);
    setIsEditing(false);

    alert("Profile updated successfully!");
  }

  return (
    <div className="profile-page">

      {/* HEADER */}

      <div className="profile-header">

        <div>
          <p className="profile-eyebrow">
            MY ACCOUNT
          </p>

          <h1>Profile</h1>

          <p className="profile-subtitle">
            Manage your buyer account information.
          </p>
        </div>

        <Link
          to="/buyer-dashboard"
          className="profile-back-button"
        >
          ← Dashboard
        </Link>

      </div>


      {/* PROFILE CARD */}

      <div className="profile-main-card">

        {/* USER HEADER */}

        <div className="profile-user-header">

          <div className="profile-avatar">
            {initials}
          </div>

          <div>
            <h2>{profile.name}</h2>
            <p>{profile.role}</p>
          </div>

          <button
            type="button"
            className="edit-profile-button"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit Profile
          </button>

        </div>


        {/* EDIT FORM */}

        {isEditing ? (

          <div className="profile-section">

            <div className="profile-section-heading">
              <span>EDIT ACCOUNT</span>
              <h3>Update Personal Information</h3>
            </div>

            <form
              className="profile-edit-form"
              onSubmit={handleSaveChanges}
            >

              <div className="profile-form-grid">

                <div className="profile-form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    defaultValue={profile.name}
                    required
                  />
                </div>


                <div className="profile-form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    defaultValue={profile.email}
                    required
                  />
                </div>


                <div className="profile-form-group">
                  <label>Mobile Number</label>

                  <input
                    type="tel"
                    name="mobile"
                    defaultValue={profile.mobile}
                    required
                  />
                </div>


                <div className="profile-form-group">
                  <label>Account Type</label>

                  <input
                    type="text"
                    value="Buyer"
                    disabled
                  />
                </div>

              </div>


              {/* ADDRESS */}

              <div className="profile-address-heading">
                <span>DELIVERY INFORMATION</span>
                <h3>Default Delivery Address</h3>
              </div>


              <div className="profile-form-grid">

                <div className="profile-form-group profile-full-width">
                  <label>Address</label>

                  <textarea
                    name="address"
                    defaultValue={profile.address || ""}
                    placeholder="Enter your delivery address"
                    rows="3"
                  ></textarea>
                </div>


                <div className="profile-form-group">
                  <label>City</label>

                  <input
                    type="text"
                    name="city"
                    defaultValue={profile.city || ""}
                    placeholder="Enter city"
                  />
                </div>


                <div className="profile-form-group">
                  <label>State</label>

                  <input
                    type="text"
                    name="state"
                    defaultValue={profile.state || ""}
                    placeholder="Enter state"
                  />
                </div>


                <div className="profile-form-group">
                  <label>Pincode</label>

                  <input
                    type="text"
                    name="pincode"
                    defaultValue={profile.pincode || ""}
                    placeholder="Enter pincode"
                  />
                </div>

              </div>


              {/* FORM BUTTONS */}

              <div className="profile-form-buttons">

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

          </div>

        ) : (

          <>

            {/* PERSONAL INFORMATION */}

            <div className="profile-section">

              <div className="profile-section-heading">
                <span>ACCOUNT INFORMATION</span>
                <h3>Personal Details</h3>
              </div>

              <div className="profile-details-grid">

                <div className="profile-detail">
                  <label>Full Name</label>
                  <p>{profile.name}</p>
                </div>

                <div className="profile-detail">
                  <label>Email Address</label>
                  <p>{profile.email}</p>
                </div>

                <div className="profile-detail">
                  <label>Mobile Number</label>
                  <p>{profile.mobile}</p>
                </div>

                <div className="profile-detail">
                  <label>Account Type</label>
                  <p>{profile.role}</p>
                </div>

                <div className="profile-detail">
                  <label>Account Created</label>
                  <p>{profile.createdAt}</p>
                </div>

                <div className="profile-detail">
                  <label>Account Status</label>
                  <p className="profile-status">
                    Active
                  </p>
                </div>

              </div>

            </div>


            {/* ORDER SUMMARY */}

            <div className="profile-section">

              <div className="profile-section-heading">
                <span>ACTIVITY</span>
                <h3>Order Summary</h3>
              </div>

              <div className="profile-stats">

                <div className="profile-stat-card">
                  <strong>{orders.length}</strong>
                  <span>Total Orders</span>
                </div>

                <div className="profile-stat-card">
                  <strong>
                    {
                      orders.filter(
                        (order) =>
                          order.status === "Delivered"
                      ).length
                    }
                  </strong>
                  <span>Delivered</span>
                </div>

                <div className="profile-stat-card">
                  <strong>
                    {
                      orders.filter(
                        (order) =>
                          order.status !== "Delivered"
                      ).length
                    }
                  </strong>
                  <span>Active Orders</span>
                </div>

              </div>

            </div>


            {/* DELIVERY INFORMATION */}

            <div className="profile-section">

              <div className="profile-section-heading">
                <span>DELIVERY</span>
                <h3>Delivery Information</h3>
              </div>

              {profile.address ? (

                <div className="profile-address-card">

                  <div className="profile-info-icon">
                    📍
                  </div>

                  <div>
                    <h4>Default Delivery Address</h4>

                    <p>
                      {profile.address}
                    </p>

                    <p>
                      {profile.city}
                      {profile.state &&
                        `, ${profile.state}`}
                      {profile.pincode &&
                        ` - ${profile.pincode}`}
                    </p>
                  </div>

                </div>

              ) : (

                <div className="profile-not-added">

                  <div className="profile-info-icon">
                    📍
                  </div>

                  <div>
                    <h4>
                      Delivery address not added
                    </h4>

                    <p>
                      Add your default delivery
                      address to make checkout easier.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="profile-small-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Add Address
                  </button>

                </div>

              )}

            </div>


            {/* SECURITY */}

            <div className="profile-section">

              <div className="profile-section-heading">
                <span>SECURITY</span>
                <h3>Account Security</h3>
              </div>

              <div className="profile-security">

                <div>
                  <h4>Password</h4>

                  <p>
                    Your password is securely managed
                    by the authentication system.
                  </p>
                </div>

                <button
                  type="button"
                  className="profile-secondary-button"
                  onClick={() =>
                    alert(
                      "Password management will be connected to the backend."
                    )
                  }
                >
                  Change Password
                </button>

              </div>

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Profile;