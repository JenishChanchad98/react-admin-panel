import { commonStyles } from "../../styles/common";
import { IoIosLogOut } from "react-icons/io";

const LogoutButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 20px",
        borderRadius: commonStyles.borderRadius.large,
        border: "none",
        background: commonStyles.colors.danger,
        color: "white",
        cursor: "pointer",
        ...commonStyles.transition,
        fontWeight: "500",
        ...commonStyles.flexStart,
        gap: "8px",
      }}
    >
      <IoIosLogOut />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
