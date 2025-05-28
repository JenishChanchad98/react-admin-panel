export default function Button({ children, onClick, type = "button" }) {
  return (
    <button type={type} onClick={onClick} style={{ padding: "10px 20px" }}>
      {children}
    </button>
  );
}
