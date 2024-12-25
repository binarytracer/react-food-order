import { currencyFormatter } from "../utils/formatting";

export default function CartItem(props) {
  const { item, onIncrease, onDecrease } = props;

  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.qty} X {currencyFormatter(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>QTY</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
