import { useNavigate } from "react-router-dom";
import { commonStyles } from "../../styles/common";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userProfile);

  const getInitials = (name) => {
    if (!name) return "👤";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div
      onClick={handleClick}
      style={{
        ...commonStyles.flexStart,
        gap: "10px",
        padding: "8px 15px",
        borderRadius: commonStyles.borderRadius.large,
        cursor: "pointer",
        ...commonStyles.transition,
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: commonStyles.colors.primary,
          color: "white",
          ...commonStyles.flexCenter,
          fontSize: "16px",
        }}
      >
        {getInitials(user?.fullName)}
      </div>
      <span
        style={{
          fontWeight: "500",
          whiteSpace: "nowrap",
        }}
      >
        {user?.fullName || "User"}
      </span>
    </div>
  );
};

export default UserProfile;
