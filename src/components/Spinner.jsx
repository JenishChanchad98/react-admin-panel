export default function Spinner() {
  return <div className="spinner" style={spinnerStyle}></div>;
}

const spinnerStyle = {
  width: "30px",
  height: "30px",
  border: "3px solid #f3f3f3",
  borderTop: "3px solid #007bff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const style = document.createElement("style");
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
