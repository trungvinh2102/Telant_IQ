FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn workspace server build

EXPOSE 3001

CMD ["yarn", "server"]
