export const calculationItemTotal = (fields, price, quantity) => {
    //using reduce function to calculate each item in the fields\
    const totalFields = fields.reduce((acc, field) => acc + field.price, 0);
    return (price + totalFields) * quantity;
}

export const calculateOrderSubtotal = (lines) => {
    const subTotal = lines.reduce((acc, line) => acc + calculationItemTotal(line.value || [], line.price, line.quantity), 0);
    return subTotal;
};

export const calculateOrderTax = (lines, taxPercentage) => {
  const orderTax = calculateOrderSubtotal(lines) * (taxPercentage / 100);
  return orderTax;
};

export const calculateOrderTotal = (lines, taxPercentage) => {
  const orderToatl = calculateOrderSubtotal(lines) + calculateOrderTax(lines, taxPercentage);
  return orderToatl;
};