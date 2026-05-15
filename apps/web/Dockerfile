FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
COPY . .
RUN npm ci && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy the standalone output
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
USER node
CMD ["node", "server.js"]
