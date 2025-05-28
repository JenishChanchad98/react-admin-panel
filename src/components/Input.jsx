export default function Input({ type, value, onChange, placeholder }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
    />
  );
}
