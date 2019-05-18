FROM node:latest

COPY . /src

WORKDIR /src

RUN apt update && apt install sqlite3 && npm install --production && npm install sqlite3

EXPOSE 3130

CMD npm start

