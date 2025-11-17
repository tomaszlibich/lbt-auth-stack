FROM node:20.18.0-alpine AS build

# 1. Work in the service directory
WORKDIR /app/healthcheck

# 2. Copy root + service configs / manifests
COPY tsconfig.base.json /app/tsconfig.base.json
COPY healthcheck/package*.json ./
COPY healthcheck/tsconfig.json ./

RUN npm install

# 3. Copy service source
COPY healthcheck/src ./src

RUN npm run build

# ---------- Runtime stage ----------
FROM node:20.18.0-alpine AS runtime

WORKDIR /app/healthcheck
ENV NODE_ENV=production

COPY healthcheck/package*.json ./

RUN npm install --omit=dev

COPY --from=build /app/healthcheck/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
