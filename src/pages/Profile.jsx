import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useToast } from "../context/ToastContext";

function Profile() {
  const { user, updateProfile } = useAuth();

  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Name is required.";
    }

    if (formData.name.trim().length < 3) {
      return "Name must contain at least 3 characters.";
    }

    if (!formData.phone.trim()) {
      return "Phone number is required.";
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      return "Phone number must contain exactly 10 digits.";
    }

    return "";
  };

  const handleSave = (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const result = updateProfile({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    showToast(result.message, "success");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
    });

    setError("");
    setIsEditing(false);
  };

  return (
    <div className="profile-page">

      {/* Page Header */}
      <div className="page-header">
        <h1>My Profile</h1>
        <p>View and manage your account information.</p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">

        {/* Profile Header */}
        <div className="profile-card-header">

          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>

        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!isEditing ? (

          /* =========================
             VIEW PROFILE
          ========================= */

          <div className="profile-details">

            <div className="profile-detail">
              <span>Full Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div className="profile-detail">
              <span>Email Address</span>
              <strong>{user?.email}</strong>
            </div>

            <div className="profile-detail">
              <span>Phone Number</span>
              <strong>
                {user?.phone || "Not provided"}
              </strong>
            </div>

            <div className="profile-detail">
              <span>Account ID</span>
              <strong>{user?.id}</strong>
            </div>

            <div className="profile-detail">
              <span>Account Created</span>
              <strong>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Not available"}
              </strong>
            </div>

            <div className="profile-actions">
              <Button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setError("");
                }}
              >
                Edit Profile
              </Button>
            </div>

          </div>

        ) : (

          /* =========================
             EDIT PROFILE
          ========================= */

          <form
            className="profile-form"
            onSubmit={handleSave}
          >

            <div className="input-group">
              <label htmlFor="profile-name">
                Full Name
              </label>

              <input
                id="profile-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="input-group">
              <label htmlFor="profile-email">
                Email Address
              </label>

              <input
                id="profile-email"
                type="email"
                value={user?.email || ""}
                disabled
              />
            </div>

            <div className="input-group">
              <label htmlFor="profile-phone">
                Phone Number
              </label>

              <input
                id="profile-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10 digit phone number"
              />
            </div>

            <div className="profile-form-actions">

              <Button type="submit">
                Save Changes
              </Button>

              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>

            </div>

          </form>
        )}

      </div>

    </div>
  );
}

export default Profile;