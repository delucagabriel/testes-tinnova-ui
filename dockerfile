FROM node:14.15.5


WORKDIR /home/ui

COPY package*.json ./
RUN npm install

COPY . .

CMD npm run start