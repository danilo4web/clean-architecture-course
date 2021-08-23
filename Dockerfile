FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install \
    npm install typescript --save \
    npm install jest --save-dev \
    npm install @types/jest --save-dev \
    npm install pg-promise --save

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "test" ]