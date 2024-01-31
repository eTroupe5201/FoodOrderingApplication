import { Timestamp } from "firebase/firestore";
import { ALLOWED_PAYMENT_METHODS } from "./Constants";

class Restaurant {
  constructor(name, address, phone, closingTime, openingTime, paymentMethods) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.closingTime = closingTime instanceof Timestamp ? closingTime : Timestamp.fromDate(new Date(closingTime));
    this.openingTime = openingTime instanceof Timestamp ? openingTime : Timestamp.fromDate(new Date(openingTime));

    this.paymentMethods = paymentMethods.filter(method => ALLOWED_PAYMENT_METHODS.includes(method));
  }

}

export default Restaurant;

/**
 const myRestaurant = new Restaurant(
  'My Restaurant',
  '123 Main St',
  '555-1234',
  new Date('2024-01-01T22:00:00Z'), 
  new Date('2024-01-01T09:00:00Z'), 
  ['cash', 'card'] 
);
 */