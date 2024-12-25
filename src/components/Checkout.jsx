import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp, { requestConfig } from "../hooks/useHttp";
import Error from "./Error";
import { useActionState } from "react";

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const newRequestConfig = {
    ...requestConfig,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    newRequestConfig
  );

  const cartTotal = cartContext.items.reduce(
    (totalItem, item) => totalItem + item.qty * item.price,
    0
  );

  function handleClose() {
    userProgressContext.hideCheckout();
  }

  function handleFinish() {
    userProgressContext.hideCheckout();
    cartContext.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, formData) {
    const customerData = Object.fromEntries(formData.entries());

    await sendRequest({
      body: JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      }),
    });
  }

  const [formState, formAction, isLoading] = useActionState(
    checkoutAction,
    null
  );

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <p>Sending order data...</p>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressContext.progress === "checkout"}
        className="checkout"
        onClose={handleClose}
      >
        <h2>Order Submitted!</h2>
        <p>Your order was submitted successfully.</p>

        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressContext.progress === "checkout"}
      className="checkout"
      onClose={handleClose}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter(cartTotal)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="E-mail Address" id="email" type="email" />
        <Input label="Street Address" id="street" type="text" />

        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        {error && <Error message={error} title="Fail to submit order" />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
