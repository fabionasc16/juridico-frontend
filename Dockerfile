FROM node:16
WORKDIR /app
COPY . .
COPY src/environments/environment.prod.ts src/environments/environment.ts
RUN npm install
RUN npm run build