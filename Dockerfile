FROM node:lts-alpine
WORKDIR /front-1-trimestre-2-daw
COPY package.json package-lock.json ./
RUN npm install --production
COPY . . 
EXPOSE 3000
CMD ["node", "build/js/server.js"]
