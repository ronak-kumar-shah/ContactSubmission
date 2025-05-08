# Use Node.js image as the base image
FROM node:current-alpine

# Set the working directory inside the container
WORKDIR /contactformapp

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY contact-app-frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY contact-app-frontend .

# Set environment argument for deployment
ARG DEPLOYMENT_ENVIRONMENT
ENV DEPLOYMENT_ENVIRONMENT=${DEPLOYMENT_ENVIRONMENT}

# Log the deployment environment (optional)
RUN echo "Deployment Environment: $DEPLOYMENT_ENVIRONMENT"

# Expose the port React runs on (default is 3000)
EXPOSE 3000

# Command to run the React app in appropriate environment mode
CMD ["npm", "run", "start"]
