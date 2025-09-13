FROM node:20-alpine
WORKDIR /srv/app
COPY . .
RUN cd apps/cms && npm install
EXPOSE 1337
CMD ["npm", "run", "develop", "--workspace=cms"]
