FROM node:22-alpine
WORKDIR /app

# Install build dependencies for native modules (sharp, etc.)
RUN apk add --no-cache python3 make g++ vips-dev

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build Payload and Next.js
RUN npm run build

# Expose port
EXPOSE 1337

# Start the application
CMD ["npm", "run", "start"]
