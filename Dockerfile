FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY packages packages/

COPY tsconfig.json .

WORKDIR /app/packages/shell
RUN npm install
RUN npm run build
WORKDIR /app

FROM nginx:alpine AS final

COPY --from=builder /app/packages/shell/dist /usr/share/nginx/html

EXPOSE 80

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]