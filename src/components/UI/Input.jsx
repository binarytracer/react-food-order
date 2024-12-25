export default function Input(props) {
  const { label, id, ...otherProps } = props;

  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...otherProps} />
    </p>
  );
}
