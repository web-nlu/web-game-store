const checkout = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/order`,
    {method: "POST"}
  );

  const {order, message} = await response.json();

  if (!response.ok) {
    console.error(message);
    return;
  }


  window.location.href = `/thanh-toan?${new URLSearchParams({
    orderCode: order.id.toString(), totalPrice: order.totalPrice.toString()
  })}`
}

export default checkout;