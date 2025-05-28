import PropTypes from "prop-types";
import { commonStyles } from "../../styles/common";

const SearchInput = ({
  placeholder = "Search...",
  width = "300px",
  onChange,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <input
        type="search"
        placeholder={placeholder}
        onChange={onChange}
        style={{
          marginBottom: "0px",
          padding: "10px 20px",
          paddingLeft: "40px",
          borderRadius: commonStyles.borderRadius.large,
          border: "1px solid #e0e0e0",
          width: width,
          outline: "none",
          fontSize: "14px",
          ...commonStyles.transition,
        }}
        onFocus={(e) => {
          e.target.style.boxShadow = commonStyles.shadows.small;
          e.target.style.borderColor = commonStyles.colors.primary;
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = "none";
          e.target.style.borderColor = "#e0e0e0";
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "15px",
          top: "20px",
          transform: "translateY(-50%)",
          color: commonStyles.colors.secondary,
        }}
      >
        🔍
      </span>
    </div>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  width: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchInput;
