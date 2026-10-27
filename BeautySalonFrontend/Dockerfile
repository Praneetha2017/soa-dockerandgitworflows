
# Stage 1: Build React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .
RUN chmod +x node_modules/.bin/vite
# Build Vite application
RUN npm run build

# Stage 2: Serve application using Nginx
FROM nginx:alpine

# Copy React build files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Keep Nginx running in the foreground
CMD ["nginx", "-g", "daemon off;"]
