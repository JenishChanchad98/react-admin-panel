import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, userRegister } from "../store/slices/authSlice";
import Spinner from "../components/Spinner";
import { showToast } from "../utils/toast";

const initialForm = { fullName: "", email: "", mobileNo: "+91", password: "" };

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: apiError } = useSelector((state) => state.auth);

  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  let displayError = validationError || apiError;

  const onChange = useCallback(
    (e) => {
      if (validationError) setValidationError("");
      if (apiError) dispatch(clearAuthError());

      setForm((prevForm) => ({
        ...prevForm,
        [e.target.name]: e.target.value,
      }));
    },
    [validationError, apiError, dispatch]
  );

  const togglePassword = () => setShowPassword((v) => !v);

  const validateForm = () => {
    const { fullName, email, mobileNo, password } = form;
    if (!fullName.trim()) return "Full name is required.";
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Invalid email format.";
    if (!mobileNo.trim()) return "Mobile number is required.";
    if (!password.trim()) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const error = validateForm();
      if (error) return setValidationError(error);
      setValidationError("");
      setLoading(true);

      try {
        const result = await dispatch(userRegister(form)).unwrap();
        showToast.success(result.message || "Registration successful", () => {
          setForm(initialForm);
          navigate("/login");
        });
      } catch (error) {
        console.log("ERROR : >>", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, form, navigate]
  );

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

        {displayError && (
          <p
            style={{ color: "red", marginBottom: "16px", textAlign: "center" }}
          >
            {displayError}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ width: "92%" }}>
          <Input
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={onChange}
            placeholder="Full name"
          />
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
          />
          <Input
            name="mobileNo"
            type="text"
            value={form.mobileNo}
            onChange={onChange}
            placeholder="Mobile Number"
          />
          <div style={{ position: "relative" }}>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={onChange}
              placeholder="Password"
            />
            <span
              onClick={togglePassword}
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
            <Button type="submit">Register</Button>
          )}
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
