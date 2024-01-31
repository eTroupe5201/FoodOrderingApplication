import { ALLOWED_PAYMENT_METHODS, ORDER_STATUS } from './Constants'; 
import Line from './Line'; 

class Order {
  constructor(firstName, lastName, email, phone, lines, comments, reason, pickupTime, paymentMethod, status, subTotal, total) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    
    if (!Array.isArray(lines) || !lines.every(line => line instanceof Line)) {
      throw new Error('lines must be an array of Line instances');
    }
    this.lines = lines;

    this.comments = comments || ''; 
    this.reason = reason || ''; 
    this.pickupTime = pickupTime;

    if (!ALLOWED_PAYMENT_METHODS.includes(paymentMethod)) {
      throw new Error('Invalid payment method');
    }
    this.paymentMethod = paymentMethod;

    if (status && !ORDER_STATUS.includes(status)) {
      throw new Error('Invalid order status');
    }
    this.status = status || 'pending'; 

    this.subTotal = subTotal;
    this.total = total;
  }
}

export default Order;