import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function ChangePassword() {
  const { changePassword } = useAuth();

  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
    if (!formData.currentPassword) {
      return "Current password is required.";
    }

    if (!formData.newPassword) {
      return "New password is required.";
    }

    if (formData.newPassword.length < 8) {
      return "New password must contain at least 8 characters.";
    }

    if (!/[A-Z]/.test(formData.newPassword)) {
      return "New password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(formData.newPassword)) {
      return "New password must contain at least one lowercase letter.";
    }

    if (!/[0-9]/.test(formData.newPassword)) {
      return "New password must contain at least one number.";
    }

    if (!/[^A-Za-z0-9]/.test(formData.newPassword)) {
      return "New password must contain at least one special character.";
    }

    if (formData.currentPassword === formData.newPassword) {
      return "New password must be different from current password.";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const result = changePassword(
      formData.currentPassword,
      formData.newPassword
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    showToast(result.message, "success");

    setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
  };

  return (
    <div className="change-password-page">

      {/* Page Header */}

      <div className="page-header">
        <h1>Change Password</h1>
        <p>Update your account password securely.</p>
      </div>


      {/* Change Password Card */}

      <div className="change-password-card">

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <Input
            label="Current Password"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter your current password"
            required
          />

          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your new password"
            required
          />


          {/* Password Requirements */}

          <div className="password-info">
            <p>Password must contain:</p>

            <ul>
              <li>At least 8 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
              <li>One special character</li>
            </ul>
          </div>


          <Button type="submit">
            Change Password
          </Button>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;