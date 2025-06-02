import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { saveToken } from "../utils/auth";
import { userLogin } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";

import Spinner from "../components/Spinner";
import { showToast } from "../utils/toast";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePassword = () => setShowPassword((v) => !v);

  const validateForm = () => {
    if (!email.trim()) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format.";
    if (!password.trim()) return "Password is required.";
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
      const result = await dispatch(userLogin({ email, password })).unwrap();
      saveToken(result.data.token);
      showToast.success(result.message, () => navigate("/dashboard"));
    } catch (error) {
      setError(
        error?.response?.data?.message || "Incorrect username or password."
      );
      setEmail("");
      setPassword("");
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
        <h2>Login</h2>
        {error && (
          <p
            style={{ color: "red", marginBottom: "16px", textAlign: "center" }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            togglePassword={togglePassword}
            showPassword={showPassword}
          />
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Spinner />
            </div>
          ) : (
            <Button type="submit">Login</Button>
          )}
        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
