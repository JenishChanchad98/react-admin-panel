export default function Input({ name, value, onChange, ...rest }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      {...rest}
      // className="input-class"
    />
  );
}
