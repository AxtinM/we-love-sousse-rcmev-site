FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY . .
RUN npm install && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
# Copy the standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
