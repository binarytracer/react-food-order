export default function Error(props) {
  const { title, message } = props;
  return (
    <div className="error center">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
