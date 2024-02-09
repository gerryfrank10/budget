FROM node:16-alpine3.11
LABEL authors="Gerald"
RUN mkdir -p "/usr/src/app"
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000

CMD ["npm", "run", "start"]