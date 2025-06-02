import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { useEffect } from "react";
import SearchInput from "./common/SearchInput";
import UserProfile from "./common/UserProfile";
import LogoutButton from "./common/LogoutButton";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../store/slices/userProfileSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <header style={headerStyles.container}>
      <div style={headerStyles.leftSection}>
        <SearchInput />
      </div>

      <div style={headerStyles.rightSection}>
        <UserProfile />
        <LogoutButton onClick={handleLogout} />
      </div>
    </header>
  );
}
