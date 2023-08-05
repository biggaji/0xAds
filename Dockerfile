FROM node:18.17.0-alpine AS build
WORKDIR /usr/src/app
COPY package*.json yarn*.lock ./
RUN yarn install --production && \
    yarn cache clean
COPY . .
RUN yarn global add typescript
RUN yarn build
RUN npx prisma generate

FROM node:18.17-alpine AS production
WORKDIR /usr/src/app/prod
COPY package*.json yarn*.lock ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./
RUN yarn global add pm2
EXPOSE 3000
RUN apk --no-cache add procps
CMD [ "pm2-runtime", "index.js" ]