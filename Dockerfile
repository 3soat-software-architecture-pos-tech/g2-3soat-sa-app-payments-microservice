FROM node:18

WORKDIR /

RUN npm install -g @webhooksite/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run doc

EXPOSE 3000 3306

CMD ["npm", "run", "dev"]

