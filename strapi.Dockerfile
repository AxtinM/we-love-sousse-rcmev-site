FROM node:22-alpine
WORKDIR /srv/app
COPY package.json ./
COPY . .
RUN npm install
EXPOSE 1337
CMD ["npm", "run", "develop"]
