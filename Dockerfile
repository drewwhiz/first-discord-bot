FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json .
RUN npm i
COPY src/ .
RUN npm run build

FROM node:22-slim AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
COPY img/ img/
COPY data/ data/

CMD [ "npm", "start" ]
