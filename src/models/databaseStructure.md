# Restaurant Application Database Structure

## Overview
This document outlines the database structure for a restaurant application, detailing the purpose, fields, and functionality of each component within the database.

### Restaurant
- **Purpose**: Stores information about a restaurant.
- **Fields**:
  - `name`: Name of the restaurant.
  - `address`: Physical address.
  - `phone`: Contact number.
  - `closingTime`: Time when the restaurant closes.
  - `openingTime`: Time when the restaurant opens.
  - `paymentMethods`: Accepted payment methods.
- **Summary**: Contains essential details about the restaurant, including operational hours and payment options.

### Category
- **Purpose**: Represents categories of items or menu sections.
- **Fields**:
  - `id`: Unique identifier.
  - `createdate`: Date of creation.
  - `lastupdate`: Date of the last update.
  - `createby`: Creator's identifier.
  - `image`: Associated image.
  - `title`: Title of the category.
  - `description`: Description of the category.
- **Summary**: Organizes menu items into groups, enhancing menu navigation.

### Item
- **Purpose**: Stores information about menu items.
- **Fields**:
  - `id`: Unique identifier.
  - `createdate`: Creation date.
  - `lastupdate`: Last update date.
  - `createby`: Creator's identifier.
  - `image`: Item image.
  - `description`: Item description.
  - `price`: Price.
  - `label`: Short label/name.
  - `category`: Associated category.
  - `variants`: Variations of the item.
- **Summary**: Core of the menu, listing available items and their details.

### Variant
- **Purpose**: Represents options or variations for a menu item.
- **Fields**:
  - `isRequired`: If choosing an option is mandatory.
  - `allowMultiple`: If multiple options can be chosen.
  - `type`: Variant type (e.g., Size, Toppings).
  - `choices`: Available options.
- **Summary**: Defines customizable aspects of a menu item, such as size or toppings.

### Order
- **Purpose**: Stores customer orders.
- **Fields**:
  - `firstName`, `lastName`: Customer's name.
  - `email`, `phone`: Contact information.
  - `lines`: Ordered items.
  - `comments`: Special instructions.
  - `reason`: Additional notes.
  - `pickupTime`: Pickup/delivery time.
  - `paymentMethod`: Payment method.
  - `status`: Order status.
  - `subTotal`, `total`: Pricing details.
- **Summary**: Captures all details about customer orders.

### Line (Part of Order)
- **Purpose**: Represents an individual item in an order.
- **Fields**:
  - `label`: Item name.
  - `price`: Item price.
  - `quantity`: Quantity ordered.
  - `instructions`: Special instructions.
  - `value`: Customizations.
- **Summary**: Details each ordered item and its customizations.

### LineValue (Part of Line)
- **Purpose**: Details customization of an ordered item.
- **Fields**:
  - `variant`: Type of variant.
  - `value`: Chosen option.
  - `price`: Additional cost.
- **Summary**: Allows detailed customization of ordered items.

---

### Examples

#### Restaurant
- **Example**: "Gourmet Burgers"
  - `name`: "Gourmet Burgers"
  - `address`: "123 Burger Lane, Flavor Town, USA"
  - `phone`: "555-1234"
  - `closingTime`: 22:00 (10 PM)
  - `openingTime`: 11:00 (11 AM)
  - `paymentMethods`: ["cash", "card"]

#### Category
- **Example**: "Vegan Options"
  - `id`: "cat123"
  - `createdate`: 2021-01-15
  - `lastupdate`: 2021-12-05
  - `createby`: "Admin1"
  - `image`: { src: "vegan-category.jpg", title: "Vegan Food" }
  - `title`: "Vegan Options"
  - `description`: "Delicious plant-based meals"

#### Item
- **Example**: "Vegan Deluxe Burger"
  - `id`: "item456"
  - `createdate`: 2021-02-20
  - `lastupdate`: 2021-05-30
  - `createby`: "Chef Mike"
  - `image`: { src: "vegan-burger.jpg", title: "Vegan Deluxe Burger" }
  - `description`: "A mouth-watering burger with a plant-based patty, avocado, and special sauce."
  - `price`: 15.00
  - `label`: "Vegan Deluxe"
  - `category`: "Vegan Options"
  - `variants`: [{ "Size": ["Small", "Regular", "Large"] }, { "Extra Toppings": ["Mushrooms", "Grilled Onions"] }]

#### Vairant (Part of Item)
- **Example**: "Size" Variant for Vegan Deluxe Burger
  - `isRequired: true (the customer must choose a size)
  - `allowMultiple: false (only one size can be selected)
  - `type: "Size"
  - `choices:
    - Small (Price: $12.00)
    - Regular (Price: $15.00)
    - Large (Price: $18.00)
#### Vairant (Part of Item)
- **Example**: "Extra Toppings" Variant for Vegan Deluxe Burger:
  - `isRequired: false (these are optional)
  - `allowMultiple: true (customers can choose more than one topping)
  - `type: "Extra Toppings"
  - `choices:
    - Mushrooms (Price: +$1.50)
    - Grilled Onions (Price: +$1.50)
    - Avocado (Price: +$2.00)

#### Order
- **Example**: Order by John Doe
  - `firstName`: "John"
  - `lastName`: "Doe"
  - `email`: "john.doe@example.com"
  - `phone`: "555-6789"
  - `lines`: [Array of Line items]
  - `comments`: "Please make the burger extra spicy."
  - `reason`: null
  - `pickupTime`: "2021-06-01 12:30"
  - `paymentMethod`: "card"
  - `status`: "pending"
  - `subTotal`: 30.00
  - `total`: 33.00

#### Line (Part of an Order)
- **Example**: Line item in John Doe's Order
  - `label`: "Vegan Deluxe Burger"
  - `price`: 15.00
  - `quantity`: 2
  - `instructions`: "Extra spicy"
  - `value`: [{variant: "Size", value: "Regular", price: 0}, {variant: "Extra Toppings", value: "Grilled Onions", price: 1.50}]

#### LineValue (Part of Line)
- **Example**: Customization for Vegan Deluxe Burger
  - `variant`: "Extra Toppings"
  - `value`: "Grilled Onions"
  - `price`: 1.50


