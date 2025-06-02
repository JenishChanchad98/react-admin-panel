import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Input({
  name,
  value,
  onChange,
  togglePassword,
  showPassword,
  ...rest
}) {
  return (
    <div style={{ position: "relative", width: "100%", display: "flex" }}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        style={{ flex: 1 }}
        {...rest}
      />
      {togglePassword && (
        <div
          onClick={togglePassword}
          style={{
            position: "absolute",
            right: "30px",
            top: "40%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
    </div>
  );
}
