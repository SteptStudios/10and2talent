# syntax=docker/dockerfile:1.6
# Multi-stage build: Vite → nginx static

# ---------- build ----------
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- serve ----------
FROM nginx:1.27-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html/10and2
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3107
CMD ["nginx", "-g", "daemon off;"]
