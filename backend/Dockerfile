FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

EXPOSE 3333

CMD ["npm", "run", "start:dev"]
