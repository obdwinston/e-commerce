function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export function calculatePrices(orderItems) {
  // Calculate items price
  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping price
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);

  // Calculate the tax price
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

  // Calculate total price
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
}
