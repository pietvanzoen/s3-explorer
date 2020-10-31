FROM node:lts-alpine as builder

WORKDIR /app

COPY ./package.json ./package-lock.json /app/

RUN npm ci

COPY . /app/

RUN npm run build

RUN npm prune --production

FROM node:lts-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/build/ /app/build/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/package.json /app/package.json

CMD ["npm", "run", "start"]
