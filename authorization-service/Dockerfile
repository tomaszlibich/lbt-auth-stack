# ---------- Build stage ----------
FROM node:20.18.0-alpine AS build

# Work in the service directory
WORKDIR /app/authorization-service

# Copy base TS config and service manifests
COPY tsconfig.base.json /app/tsconfig.base.json
COPY authorization-service/package*.json ./
COPY authorization-service/tsconfig.json ./

# Install deps (including dev deps like typescript)
RUN npm install

# Copy source
COPY authorization-service/src ./src

# Compile TypeScript -> dist (per tsconfig.json)
RUN npm run build

# ---------- Runtime stage ----------
FROM node:20.18.0-alpine AS runtime

WORKDIR /app/authorization-service
ENV NODE_ENV=production

COPY authorization-service/package*.json ./
RUN npm install --omit=dev

# Copy compiled JS from build stage
COPY --from=build /app/authorization-service/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
