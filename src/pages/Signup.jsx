import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "../api/axiosInstance";
import { saveToken } from "../utils/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!fullName.trim()) return "Full Name is required.";
    if (!email.trim()) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format.";
    if (!mobileNo.trim()) return "Mobile Number is required.";
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobileNo)) return "Invalid mobile number.";
    if (!password.trim()) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/register", {
        fullName,
        email,
        mobileNo,
        password,
      });
      saveToken(res.data.data);
      navigate("/dashboard");
    } catch (error) {
      setError(
        error?.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="login-container">
        <h2>Sign Up</h2>

        {error && (
          <p
            style={{ color: "red", marginBottom: "16px", textAlign: "center" }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
          />

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <Input
            type="text"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            placeholder="Mobile Number"
          />

          <div style={{ position: "relative" }}>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <Button type="submit">{loading ? "Signing up..." : "Sign Up"}</Button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
