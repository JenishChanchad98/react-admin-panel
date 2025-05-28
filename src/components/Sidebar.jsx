import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/profile", label: "Profile", icon: "👤" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div
      style={{
        height: "100vh",
        width: "250px",
        background: "#ffffff",
        borderRight: "1px solid #e0e0e0",
        padding: "30px 20px",
        boxSizing: "border-box",
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          marginBottom: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/dashboard">
          <img
            src="/niftech-logo.svg"
            alt="Company Logo"
            style={{ height: "40px", cursor: "pointer" }}
          />
        </Link>
      </div>

      {/* Menu Items Section */}
      <div>
        {menuItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              padding: "12px 15px",
              marginBottom: "8px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background:
                location.pathname === item.path ? "#f0f0f0" : "transparent",
              color: location.pathname === item.path ? "#1a73e8" : "#333",
              transition: "all 0.3s ease",
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
