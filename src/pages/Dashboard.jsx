import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-content">

      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back to your authentication dashboard.</p>
      </div>

      <div className="welcome-card">
        <h2>Welcome, {user?.name}!</h2>

        <p>
          You are successfully logged in to your account.
        </p>
      </div>

      <div className="dashboard-grid">

        <div className="info-card">
          <h3>Name</h3>
          <p>{user?.name}</p>
        </div>

        <div className="info-card">
          <h3>Email</h3>
          <p>{user?.email}</p>
        </div>

        <div className="info-card">
          <h3>Phone</h3>
          <p>{user?.phone || "Not provided"}</p>
        </div>

        <div className="info-card">
          <h3>Account ID</h3>
          <p>{user?.id}</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;