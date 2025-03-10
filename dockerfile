# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD npx prisma migrate deploy && node app.js