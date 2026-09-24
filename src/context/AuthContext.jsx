import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved user when application starts
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // Register a new user
  const register = (userData) => {
    const existingUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const userExists = existingUsers.some(
      (existingUser) =>
        existingUser.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (userExists) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || "",
      createdAt: new Date().toISOString(),
    };

    existingUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(existingUsers));

    return {
      success: true,
      message: "Registration successful.",
    };
  };

  // Login user
  const login = (email, password, rememberMe = false) => {
    const existingUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const foundUser = existingUsers.find(
      (existingUser) =>
        existingUser.email.toLowerCase() === email.toLowerCase() &&
        existingUser.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
      createdAt: foundUser.createdAt,
    };

    setUser(loggedInUser);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(loggedInUser)
    );

    localStorage.setItem(
      "rememberMe",
      rememberMe.toString()
    );

    return {
      success: true,
      message: "Login successful.",
    };
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rememberMe");
  };

  // Update profile
  const updateProfile = (updatedData) => {
    const existingUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const updatedUsers = existingUsers.map((existingUser) => {
      if (existingUser.id === user.id) {
        return {
          ...existingUser,
          name: updatedData.name,
          phone: updatedData.phone,
        };
      }

      return existingUser;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedUser = {
      ...user,
      name: updatedData.name,
      phone: updatedData.phone,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    return {
      success: true,
      message: "Profile updated successfully.",
    };
  };

  // Change password
  const changePassword = (currentPassword, newPassword) => {
    const existingUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const currentUser = existingUsers.find(
      (existingUser) => existingUser.id === user.id
    );

    if (!currentUser || currentUser.password !== currentPassword) {
      return {
        success: false,
        message: "Current password is incorrect.",
      };
    }

    const updatedUsers = existingUsers.map((existingUser) => {
      if (existingUser.id === user.id) {
        return {
          ...existingUser,
          password: newPassword,
        };
      }

      return existingUser;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return {
      success: true,
      message: "Password changed successfully.",
    };
  };

  // Reset password
  const resetPassword = (email, newPassword) => {
    const existingUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const userExists = existingUsers.some(
      (existingUser) =>
        existingUser.email.toLowerCase() === email.toLowerCase()
    );

    if (!userExists) {
      return {
        success: false,
        message: "No account found with this email.",
      };
    }

    const updatedUsers = existingUsers.map((existingUser) => {
      if (
        existingUser.email.toLowerCase() === email.toLowerCase()
      ) {
        return {
          ...existingUser,
          password: newPassword,
        };
      }

      return existingUser;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return {
      success: true,
      message: "Password reset successfully.",
    };
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}