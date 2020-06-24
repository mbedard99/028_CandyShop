FROM node:12-slim
WORKDIR /usr/scr/app
COPY package.json package*.json ./
RUN npm install --only=production
COPY . .
CMD ["npm", "start"]
