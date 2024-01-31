import LineValue from './LineValue';

class Line {
    constructor(label, price, quantity, instructions, value) {
      this.label = label;
      this.price = price;
      this.quantity = quantity;
      this.instructions = instructions;
      
      if (value && !Array.isArray(value)) {
        throw new Error('value must be an array');
      }
      if (value && !value.every(item => item instanceof LineValue)) {
        throw new Error('Every item in value must be an instance of LineValue');
      }
      this.value = value || []; 
    }
  }
  
  export default Line;