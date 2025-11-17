FROM node:20.18.0-alpine AS build

# 1. Work in the service directory
WORKDIR /app/authentication-service

# 2. Copy root + service configs / manifests
COPY tsconfig.base.json /app/tsconfig.base.json
COPY authentication-service/package*.json ./
COPY authentication-service/tsconfig.json ./

RUN npm install

# 3. Copy service source
COPY authentication-service/src ./src

RUN npm run build

# ---------- Runtime stage ----------
FROM node:20.18.0-alpine AS runtime

WORKDIR /app/authentication-service
ENV NODE_ENV=production

COPY authentication-service/package*.json ./

RUN npm install --omit=dev

COPY --from=build /app/authentication-service/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
