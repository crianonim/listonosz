FROM node:latest

COPY . /src

WORKDIR /src

RUN apt-get update && apt-get install sqlite3 && apt-get install build-essential && npm install --production && npm install sqlite3

EXPOSE 3130

CMD npm start

