FROM node:22-alpine
WORKDIR /srv/app

# Install build dependencies for native modules and PostgreSQL client
RUN apk add --no-cache python3 make g++ postgresql-client vips-dev

# Build arguments for Strapi admin panel (needed at build time)
ARG APP_KEYS
ARG API_TOKEN_SALT
ARG ADMIN_JWT_SECRET
ARG TRANSFER_TOKEN_SALT
ARG ENCRYPTION_KEY
ARG JWT_SECRET
ARG NODE_ENV

# Set environment variables from build args
ENV APP_KEYS=${APP_KEYS}
ENV API_TOKEN_SALT=${API_TOKEN_SALT}
ENV ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}
ENV TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT}
ENV ENCRYPTION_KEY=${ENCRYPTION_KEY}
ENV JWT_SECRET=${JWT_SECRET}
ENV NODE_ENV=${NODE_ENV}

# Hardcode server config
ENV HOST=0.0.0.0
ENV PORT=1337

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with retry logic and increased timeout
RUN npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-timeout 600000 && \
    npm ci --omit=dev --prefer-offline --no-audit || npm i --omit=dev --prefer-offline --no-audit

# Copy application code
COPY . .

# Build Strapi admin panel
RUN npm run build

# Expose Strapi port
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"]
