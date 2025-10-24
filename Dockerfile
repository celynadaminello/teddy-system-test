FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --silent

COPY packages packages/

COPY tsconfig.json .
COPY vite.config.ts . 

RUN npm run build --workspace packages/shell

FROM nginx:alpine AS final

COPY --from=builder /app/packages/shell/dist /usr/share/nginx/html

EXPOSE 80

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]