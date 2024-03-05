# Welcome to Divine Delicacies, a Restaurant ordering website 
This web application is an ordering website for guests to place orders. It includes login/registration, menu browsing, cart building, and order placement.

<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:<br/>

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh <br/> -->

### Run locally on our code: http://localhost:5173/

# Front-end

## Tech stack
• <b>Architecture and framework:</b> Use React to create SPA and modular design.<br/>
• <b>User interface:</b> Use Chakra UI and Sass for responsive and modern interface design.<br/>
• <b>Status management:</b> Use Redux to manage application status, such as user login and shopping cart.<br/>
• <b>Routing:</b> Utilize React Router to handle front-end routing.<br/>

## Login Page/Register Page
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/67bc014d-6c61-425b-8233-c038e4c12de2)

![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/1491591f-c9cf-4271-aecf-2012926a15d2)

## Homepage
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/bf41b496-81d0-4f49-a545-073f2a95a5d7)

## Order Page
![0070ccd6332b67b7c0aa417716ad80b](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/fd4cc85d-1783-4a9a-9015-7943bfeb1762)

## Item Page
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/31fa8212-c696-4015-89a4-2cc415143279)

## CheckOut Page
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/40f07fda-c359-47b1-8dd4-835a84fde31b)

## Payment Successful Page
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/97028950-664c-4acb-92cc-65062c24519d)

## Order History Page
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/538b59a8-dc69-4af8-9f4f-276799b27b68)

# Back-end

## Tech stack
• <b>Database:</b> Use Firebase Firestore as the primary database. Store user data, menu items, order records, etc. for the application.<br/>
• <b>Authentication:</b> Use Firebase tokens to manage sessions and maintain user status.<br/>
• <b>Business logic:</b> Use React admin as a front-end and back-end interaction to process orders, payments, and user management.And integrate third-party payment APIs such as Stripe or PayPal to handle payments and refunds.<br/>
• <b>Introducing Google Maps</b><br/>
• <b>notification WebSocket：</b>achieve bidirectional link communication, push messages to the front-end consumer, and the message format may be similar to {order information, delivery information}. <br/>Integrate Google Cloud Tasks as a fully hosted service for executing, scheduling, and delaying the execution of backend tasks. It can efficiently perform asynchronous processing and time-consuming tasks, especially suitable for sending emails or other operations that require delayed execution. Cloud Tasks provide a queue for tasks, ensuring that they are reliably executed and retried without affecting the user experience due to front-end system load. <br/>

1 null delivery information ->2 delivery information ->3 delivery current location ->4 delivery current location and remaining time expect ->5, xxx ->6 Deliveryman has been to destination.<br/>

## Register situation
• <b>1</b> Register Page - Register Button<br/>
![RUFQG4UWUJK5)8~ K4DT)GM](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/e7cee91c-c8ba-4cfe-81b0-810337587a2c)
• <b>2</b> Register Page - Verfied Button(waiting to be verfied by the email)<br/>
![XM3_44WB7M1 _3$5ZRI$@EN](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/c9775f2d-f5a5-495b-b85b-43f0ce6c6824)
• <b>3</b> Register Page - Click the verified button if the email is not authenticated<br/>
![WYV94 (}62}SEIK~0T{3NV7](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/00491a0d-d7c5-48d9-bcd7-a7e0b7d0e3e8)
• <b>4</b> Go to the email（Gmail as an example) to check the verification information<br/>
![`{S{7TF@%RN(U$ LI $QHJW](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/7f9c1957-9797-4360-9ada-f348d058808d)
![3C617TJCVC7$}OH(~%CZBFC](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/59a2dce9-2000-4b93-bbdc-33de9f70d7bd)
<br/>
• <b>5</b> Email verification successful, redirect to login page<br/>
![@MC)II_F6CBB1NZ7OLE2SV9](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/72c356e5-813b-42af-b23a-675d58088a3c)
• <b>6</b> Save into firebase without password, ensuring security problem<br/>
![AU}VOPTKHZIHO3JBLKFMSPV](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/0d04f050-d321-42b7-b7e9-ae66082b2e48)


## Login situation
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/29230a52-1ad1-4c45-bc20-b820bbf3911e)

## Reset password
![9325987f3a6e7e43b5873b66d814ef2](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/fef4b03b-8728-495e-abb1-9431e9151ecf)

## Add To Cart
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/44902985-ca2c-40f3-88eb-b0b7b4c26f5c)
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/019a3d9d-e237-4a5a-a5e2-47340df5bb5b)

## Third-party payment - PayPal
![242c85ce93f62b3a18273ea64963315](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/d15bcafa-e80f-4202-8f88-6b4c5762cbc2)

## Info Page after payment - Google Map
![d0fd4541b1c69a8ec9b0b961b331b0d](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/17b26464-6065-4629-b858-3ce349feee56)

## react-admin
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/f3cdab56-0f1c-442e-8bfe-766e5a9c0df7)
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/695bf014-eb97-4f74-9ab7-1b896a6f046d)
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/1b05f1cc-40d2-4a2a-9677-04dd4ceddc1b)

## notifications - Google Cloud
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/347626a5-dd3e-42ce-a8cb-fc5019d1650f)
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/8c73d8fa-6ef4-479e-a491-2b9bc3b5e0d1)
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/6900a6a6-86ba-467d-8824-301a9d9c877a)


# Database
## • firebase
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/3e43dc01-9265-43a7-a2fa-86d233aefc88)
## • redis(TBD)
![image](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/00a05552-65b7-462b-8611-75ff4dd53592)

# Devops

## Tech stack
• <b>CI/CD:</b> Set up GitHub Actions for automated build, testing, and deployment.<br/>
• <b>Containerization:</b> Use Docker containerization applications to maintain environmental consistency.<br/>
• <b>Orchestration(TBD):</b> Kubernetes for managing container lifecycle<br/> 

## • CI/CD With Github Actions
![3b24da6ae07d8cca23c83b61633d565](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/2ea93c2e-fd0e-4296-9e00-e3382913312e)

## • Docker Container Running
![278c4de07e8738b50b52ceb75d90e79](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/6bcbb9c3-c279-4859-9dd4-202cc5a511e4)
![53d63e4628c5bdf183327f639d0a7d0](https://github.com/eTroupe5201/FoodOrderingApplication/assets/129224800/2025bb8e-d8c5-4fcf-8840-875c5f4b9f65)




