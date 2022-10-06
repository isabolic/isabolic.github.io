ARG GA_TRACKING_ID

FROM node:18.5 as build

ENV REACT_APP_GA_TRACKING_ID $GA_TRACKING_ID

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install

RUN echo $(REACT_APP_GA_TRACKING_ID)

RUN pnpm run build

FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80