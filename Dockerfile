FROM node:18.12.1 as build
WORKDIR /monitor

COPY package*.json .
RUN npm install
COPY . .

RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /monitor/build /usr/share/nginx/html