FROM node:18.12.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18.12.1-alpine AS server
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY . .
RUN npm run build
COPY --from=builder ./app/build ./build
CMD ["npm", "start"]
