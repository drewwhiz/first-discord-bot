FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json .
RUN npm i
COPY src/ .
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
COPY img/ img/
COPY migrations/ migrations/
COPY data/ data/

CMD [ "npm", "start" ]
