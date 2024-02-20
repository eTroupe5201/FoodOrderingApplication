// Define the payment methods
const PAYMENT_METHODS = [
    { id: "card", name: "Credit Card" },
    { id: "cash", name: "Cash at the counter" },
    { id: "phone", name: "Call me back to get payment information" },
];
  
// Define the order statuses
const ORDER_STATUS = [
    { id: "pending", name: "Pending" },
    { id: "confirmed", name: "Confirmed" },
    { id: "cancelled", name: "Cancelled" },
];

export { PAYMENT_METHODS, ORDER_STATUS };