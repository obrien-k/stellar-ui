FROM node:lts-alpine AS build

ARG GATSBY_API_URL
ARG GATSBY_HCAPTCHA_SITEKEY
ARG GA_TRACKING_ID

WORKDIR /usr/src/stellar-ui

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/stellar-ui/dist /usr/share/nginx/html

EXPOSE 80
