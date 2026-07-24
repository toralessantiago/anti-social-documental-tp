#Imagen con la que voy a trabajar
FROM node:22-alpine

#Directorio de trabajo
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]