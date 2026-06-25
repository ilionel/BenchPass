# --- build the static site ---
FROM node:26-alpine AS build
WORKDIR /app
ENV CI=false
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# --- serve it ---
FROM nginx:1.31-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
