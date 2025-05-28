import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { commonStyles } from "../../styles/common";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user);

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
        {getInitials(userData?.fullName)}
      </div>
      <span
        style={{
          fontWeight: "500",
          whiteSpace: "nowrap",
        }}
      >
        {userData?.fullName || "User"}
      </span>
    </div>
  );
};

UserProfile.propTypes = {
  userData: PropTypes.shape({
    fullName: PropTypes.string,
  }),
};

export default UserProfile;
