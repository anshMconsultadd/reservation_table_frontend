# Use Node.js as the base image
FROM node:18-alpine 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN npm run build 

# Install serve (to serve static files)
RUN npm install -g serve 

# Expose the port
EXPOSE 5173 

# Serve the built app
CMD ["serve", "-s", "dist", "-l", "5173"]
