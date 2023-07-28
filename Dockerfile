FROM node:18.17.0-alpine as build
WORKDIR /adserver
COPY package*.json yarn*.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:18:17:0-alpine as production
ENV NODE_ENV production
WORKDIR /adserver
COPY package*.json yarn*.lock ./
RUN yarn install --production
COPY --from=build /adserver/dist ./dist
EXPOSE 81
CMD [ "node", "./dist/index.js" ]

FROM production as staging
ENV NODE_ENV staging
EXPOSE 3000