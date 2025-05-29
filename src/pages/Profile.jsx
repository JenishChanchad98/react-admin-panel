import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCamera } from "react-icons/fa";
import { commonStyles } from "../styles/common";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../store/slices/userProfileSlice";
import Spinner from "../components/Spinner";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    setFullName(user?.fullName ?? "");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { status } = await dispatch(
        updateProfile({ name: fullName })
      ).unwrap();
      if (status === "success") {
        dispatch(fetchProfile());
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .filter(Boolean)
          .map((n) => n[0].toUpperCase())
          .join("")
      : "👤";

  if (loading && !user) {
    return (
      <div style={{ ...commonStyles.flexCenter, height: "100vh" }}>
        <Spinner />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 30px" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: commonStyles.shadows.medium,
          padding: "30px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div style={{ ...commonStyles.flexBetween, marginBottom: "30px" }}>
          <h2 style={{ margin: 0 }}>Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              padding: "8px 20px",
              borderRadius: commonStyles.borderRadius.medium,
              border: "none",
              background: isEditing
                ? commonStyles.colors.secondary
                : commonStyles.colors.primary,
              color: "white",
              cursor: "pointer",
              ...commonStyles.transition,
            }}
          >
            {isEditing ? "Cancel" : "Edit Name"}
          </button>
        </div>

        {error && (
          <div
            style={{
              background: "#fee",
              color: commonStyles.colors.danger,
              padding: "10px",
              borderRadius: commonStyles.borderRadius.medium,
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "30px", marginBottom: "30px" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: commonStyles.colors.primary,
              color: "white",
              ...commonStyles.flexCenter,
              fontSize: "40px",
              position: "relative",
            }}
          >
            {getInitials(user?.fullName)}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                background: commonStyles.colors.secondary,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                ...commonStyles.flexCenter,
                cursor: "pointer",
                ...commonStyles.transition,
              }}
            >
              <FaCamera />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: commonStyles.borderRadius.medium,
                      border: "1px solid #ddd",
                    }}
                  />
                </div>

                {saving ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Spinner />
                  </div>
                ) : (
                  <button
                    type="submit"
                    style={{
                      padding: "10px 20px",
                      borderRadius: commonStyles.borderRadius.medium,
                      border: "none",
                      background: commonStyles.colors.primary,
                      color: "white",
                      cursor: "pointer",
                      ...commonStyles.transition,
                    }}
                  >
                    Submit
                  </button>
                )}
              </form>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "15px",
                  }}
                >
                  <FaUser color={commonStyles.colors.primary} />
                  <span style={{ fontSize: "18px" }}>{user?.fullName}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "15px",
                  }}
                >
                  <FaEnvelope color={commonStyles.colors.primary} />
                  <span>{user?.email}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <FaPhone color={commonStyles.colors.primary} />
                  <span>{user?.mobileNo}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "20px",
            marginTop: "20px",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>Account Information</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            <div>
              <p
                style={{
                  color: commonStyles.colors.secondary,
                  margin: "0 0 5px 0",
                }}
              >
                Account Type
              </p>
              <p style={{ margin: 0 }}>Standard User</p>
            </div>
            <div>
              <p
                style={{
                  color: commonStyles.colors.secondary,
                  margin: "0 0 5px 0",
                }}
              >
                Member Since
              </p>
              <p style={{ margin: 0 }}>
                {user?.updatedAt
                  ? new Date(user.updatedAt).getFullYear()
                  : "N/A"}
              </p>
            </div>
            <div>
              <p
                style={{
                  color: commonStyles.colors.secondary,
                  margin: "0 0 5px 0",
                }}
              >
                Last Updated
              </p>
              <p style={{ margin: 0 }}>
                {user?.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
