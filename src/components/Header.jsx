import { useNavigate } from "react-router-dom";
import { removeToken, getToken } from "../utils/auth";
import { useEffect, useState } from "react";
import SearchInput from "./common/SearchInput";
import UserProfile from "./common/UserProfile";
import LogoutButton from "./common/LogoutButton";

const headerStyles = {
  container: {
    background: "#ffffff",
    padding: "5px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    top: 0,
    right: 0,
    left: "250px",
    zIndex: 1000,
    height: "70px",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
};

export default function Header() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = getToken();
    setUserData(data.user);
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const handleSearch = (e) => {
    // Implement search functionality
    console.log("Searching for:", e.target.value);
  };

  return (
    <header style={headerStyles.container}>
      <div style={headerStyles.leftSection}>
        <SearchInput onChange={handleSearch} />
      </div>
      <div style={headerStyles.rightSection}>
        <UserProfile userData={userData} />
        <LogoutButton onClick={handleLogout} />
      </div>
    </header>
  );
}
