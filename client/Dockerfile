FROM node:18.5 as build

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install

ARG GA_TRACKING_ID

ENV REACT_APP_GA_TRACKING_ID $GA_TRACKING_ID

RUN pnpm run build

FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80