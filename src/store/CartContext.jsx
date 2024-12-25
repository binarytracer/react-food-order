import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  const { items } = state;

  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === item.id
    );

    const updatedItems = [...items];

    if (existingItemIndex > -1) {
      const existingItem = state.items[existingItemIndex];

      updatedItems[existingItemIndex] = {
        ...existingItem,
        qty: existingItem.qty + 1,
      };
    } else {
      updatedItems.push({ ...action.item, qty: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === item.id
    );

    const existingItem = state.items[existingItemIndex];

    if (existingItem.qty === 1) {
      const updatedItems = state.items.filter((item) => item.id !== action.id);
      updatedItems.splice(existingItemIndex, 1);

      return { ...state, items: updatedItems };
    }

    const updatedItem = { ...existingItem, qty: existingItem.qty - 1 };
    const updatedItems = [...items];

    updatedItems[existingItemIndex] = updatedItem;

    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider(props) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItemHandler(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItemHandler(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  const context = {
    items: cart.items,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContext;
