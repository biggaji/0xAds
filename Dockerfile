FROM node:18.17.0-alpine
WORKDIR /adserver
ADD package*.json ./
RUN yarn
ADD . .
RUN yarn build
EXPOSE ${PORT}
CMD node start