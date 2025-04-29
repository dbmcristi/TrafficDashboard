FROM node:alpine

WORKDIR /usr/app

COPY package.json ./

COPY package-lock.json ./

COPY ./ ./

CMD ["npm", "start"]