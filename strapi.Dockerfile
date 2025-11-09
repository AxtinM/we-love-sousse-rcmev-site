FROM node:22-alpine
WORKDIR /srv/app
COPY package.json ./
COPY . .
RUN npm install
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]
