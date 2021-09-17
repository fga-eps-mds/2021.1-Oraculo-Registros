FROM node:15

COPY . /app

WORKDIR /app  

CMD ["sh","-c", "npm install && npm start"]