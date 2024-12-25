import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";

export default function Header() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const itemCount = cartContext.items.reduce(
    (count, item) => count + item.qty,
    0
  );

  function handleShowCart() {
    userProgressContext.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>React: Food Order</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({itemCount})
        </Button>
      </nav>
    </header>
  );
}
