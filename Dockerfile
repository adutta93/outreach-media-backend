FROM node:14

WORKDIR /src/app

ENV NODE_ENV development

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g pm2

EXPOSE 1993

CMD ["pm2-runtime","app.js", "yarn", "npm", "start", ]
