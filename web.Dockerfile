FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN cd apps/web && npm install && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/package.json ./package.json
RUN npm install --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
