export async function createOrder(cartItems, customerData) {
  const payload = {
    order: {
      items: cartItems,
      customer: customerData,
    },
  };

  try {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return response.json();
  } catch (e) {
    console.error(e);
  }
}
