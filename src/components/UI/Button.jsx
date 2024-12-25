export default function Button(props) {
  const { children, textOnly, className, ...otherProps } = props;

  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses = cssClasses + " " + className;

  return (
    <button className={cssClasses} {...otherProps}>
      {children}
    </button>
  );
}
