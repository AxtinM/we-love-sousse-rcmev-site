FROM node:22-alpine
WORKDIR /srv/app

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

# Build arguments for admin panel
ARG STRAPI_ADMIN_BACKEND_URL
ENV STRAPI_ADMIN_BACKEND_URL=${STRAPI_ADMIN_BACKEND_URL}

COPY package.json ./
COPY . .
RUN npm install
RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]
