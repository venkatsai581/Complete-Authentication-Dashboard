import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function DashboardLayout() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    
    showToast(
        "You have been logged out successfully.",
        "success"
        );
        navigate("/login");
};

  return (
    <div className="dashboard-layout">

      {/* Navbar */}
      <header className="dashboard-navbar">

        <div className="navbar-left">
          <button
            className="menu-button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <h2>Auth Dashboard</h2>
        </div>

        <div className="navbar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="navbar-user-info">
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
        </div>

      </header>

      <div className="dashboard-body">

        {/* Sidebar */}
        <aside
          className={`dashboard-sidebar ${
            sidebarOpen ? "sidebar-open" : ""
          }`}
        >

          <nav className="sidebar-navigation">

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              onClick={() => setSidebarOpen(false)}
            >
              
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              onClick={() => setSidebarOpen(false)}
            >
              
              <span>Profile</span>
            </NavLink>

            <NavLink
              to="/change-password"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              onClick={() => setSidebarOpen(false)}
            >
              
              <span>Change Password</span>
            </NavLink>

          </nav>

          <div className="sidebar-bottom">

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              
              <span>Logout</span>
            </button>

          </div>

        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;