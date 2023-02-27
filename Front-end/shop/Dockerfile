FROM node:18.14.0-alpine

RUN apk update 

WORKDIR /lops-shop/frontend/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]