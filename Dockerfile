#Run command $ docker run -p 3000:3000   -e FIREBASE_PROJECT_ID
#-e FIREBASE_CLIENT_EMAIL=firebase-adminsdk-ekbtq@food-odering-project-3e43f.iam.gserviceaccount.com   
#-e FIREBASE_PRIVATE_KEY="$(cat /c/class/SE491/firebaseSecret/out.txt | base64 --decode)"   food-ordering-app

# Phase 1: Building application using Node.js 18 image
FROM node:18 as builder
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# Phase 2: Running the application with a lightweight Node.js image
FROM node:18-slim
WORKDIR /app

# Create a non-root user for running the application
RUN groupadd -r appuser && useradd -r -g appuser -d /home/appuser -m appuser

# Copy the built application from the builder phase
COPY --from=builder /app /app
# Change the ownership of the /app directory to appuser
RUN chown -R appuser:appuser /app

USER appuser

# Set metadata for the image
LABEL maintainer="hezhihong98@gmail.com"
LABEL description="Food Odering Project"
LABEL version="1.0"

# Expose the port the app runs on
# EXPOSE 8080

# Define environment variables for Firebase (Replace these placeholders with real values or use Docker run -e option)
ENV FIREBASE_PROJECT_ID=food-odering-project-3e43f
ENV FIREBASE_CLIENT_EMAIL=firebase-adminsdk-ekbtq@food-odering-project-3e43f.iam.gserviceaccount.com

# Command to run the application
CMD ["npm", "run", "dev"]
