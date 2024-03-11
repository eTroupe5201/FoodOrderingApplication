// Define the payment methods
const PAYMENT_METHODS = [
    { id: "card", name: "Credit Card" },
    { id: "cash", name: "Cash at the counter" },
    { id: "phone", name: "Call me back to get payment information" },
];
  
//Define order receiving methods 
const RECEIVE_METHODS = [
    { id: "delivery", name: "Deliver to my Address Listed Above" },
    { id: "pickup", name: "Pickup at the Restaurant" },
];

// Define the order statuses
const ORDER_STATUS = [
    { id: "pending", name: "Pending" },
    { id: "confirmed", name: "Confirmed" },
    { id: "cancelled", name: "Cancelled" },
];

export { PAYMENT_METHODS, ORDER_STATUS, RECEIVE_METHODS };