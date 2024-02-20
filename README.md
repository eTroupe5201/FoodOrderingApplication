# Welcome to Divine Delicacies, a Restaurant ordering website 
This web application is an ordering website for guests to place orders. It includes login/registration, menu browsing, cart building, and order placement.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:<br/>

### Run on our code: http://localhost:5173/

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh <br/>

# Front-end

## Tech stack
• <b>Architecture and framework:</b> Use React to create SPA and modular design.<br/>
• <b>User interface:</b> Use Chakra UI and Sass for responsive and modern interface design.<br/>
• <b>Status management:</b> Use Redux to manage application status, such as user login and shopping cart.<br/>
• <b>Routing:</b> Utilize React Router to handle front-end routing.<br/>

## Login Page/Register Page
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/e19616c7-868a-428e-a988-39690b6523c0)
<br/>
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/10239ad2-066e-4a82-bc6e-569f3b43bc29)

## Homepage
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/bf41b496-81d0-4f49-a545-073f2a95a5d7)

## Order Page
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/61eabf02-65f9-4ed4-bd6b-535e312ee8a9)

# Back-end

## Tech stack
• <b>Database:</b> Use Firebase Firestore as the primary database. Store user data, menu items, order records, etc. for the application.<br/>
• <b>Authentication:</b> Use Firebase tokens to manage sessions and maintain user status.<br/>
• <b>Business logic:</b> Use React admin as a front-end and back-end interaction to process orders, payments, and user management.And integrate third-party payment APIs such as Stripe or PayPal to handle payments and refunds.<br/>
• <b>Introducing Google Maps</b><br/>
• <b>notification WebSocket：</b>achieve bidirectional link communication, push messages to the front-end consumer, and the message format may be similar to {order information, delivery information}. <br/>For example, simulate what the communication location of this message will look like: <br/>

1 null delivery information ->2 delivery information ->3 delivery current location ->4 delivery current location and remaining time expect ->5, xxx ->6 Deliveryman has been to destination.<br/>

## Register situation
![8de3062792dddf4de659c96a3c75d7d](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/e9d5740f-a7f4-4711-bc1a-e7752ab0bff3)

## Login situation
![32105b8e8c08f7fa06a87c39d3148aa](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/4975e02b-003e-40da-b24e-7fd8af0433d7)
![055a5f2497d6764ab984bb3cd5139aa](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/c847b403-acd0-4ba4-8551-89c773209ac7)

## Reset password
![9325987f3a6e7e43b5873b66d814ef2](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/fef4b03b-8728-495e-abb1-9431e9151ecf)
![b5b100a7c4f80e22ccfcdc67ac7f65f](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/0e3fec86-5a87-43aa-a2d4-3ce3bcb4744d)

## react-admin
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/f3cdab56-0f1c-442e-8bfe-766e5a9c0df7)

# Database
## • firebase
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/3e43dc01-9265-43a7-a2fa-86d233aefc88)
## • redis(TBD)
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/00a05552-65b7-462b-8611-75ff4dd53592)

# Devops

## Tech stack
• <b>CI/CD:</b> Set up GitHub Actions for automated build, testing, and deployment.<br/>
• <b>Containerization(TBD):</b> Use Docker containerization applications to maintain environmental consistency.<br/>
• <b>Orchestration(TBD):</b> Kubernetes for managing container lifecycle<br/> 
