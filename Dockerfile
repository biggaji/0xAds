FROM node:18.17.0-alpine AS build
WORKDIR /usr/src/app
COPY package*.json yarn*.lock ./
RUN yarn install --production && \
    yarn cache clean
COPY . .
RUN yarn global add typescript
RUN yarn build
RUN npx prisma generate

FROM build AS production
SHELL ["/bin/sh", "-c"]
WORKDIR /usr/src/app/prod
COPY package*.json yarn*.lock ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./
COPY --from=build /usr/src/app/migrate_db_and_start.sh ./
COPY --from=build /usr/src/app/prisma ./prisma
RUN chmod +x migrate_db_and_start.sh
RUN yarn global add pm2
EXPOSE 3000
RUN apk --no-cache add procps
ENTRYPOINT [ "./migrate_db_and_start.sh" ]