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
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY img/ img/

CMD [ "npm", "start" ]
