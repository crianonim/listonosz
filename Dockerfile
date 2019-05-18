FROM node:lts

COPY . /src

WORKDIR /src

RUN apt-get update && apt-get install sqlite3  && npm install --production 

EXPOSE 3130

CMD npm start

