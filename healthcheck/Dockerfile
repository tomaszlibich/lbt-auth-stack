# ---------- Build stage ----------
FROM node:20.18.0-alpine AS build

# Work in the service directory
WORKDIR /app/healthcheck

# Copy base TS config and service manifests
COPY tsconfig.base.json /app/tsconfig.base.json
COPY healthcheck/package*.json ./
COPY healthcheck/tsconfig.json ./

# Install deps (including dev deps like typescript)
RUN npm install

# Copy source
COPY healthcheck/src ./src

# Compile TypeScript -> dist (per tsconfig.json)
RUN npm run build

# ---------- Runtime stage ----------
FROM node:20.18.0-alpine AS runtime

WORKDIR /app/healthcheck
ENV NODE_ENV=production

COPY healthcheck/package*.json ./
RUN npm install --omit=dev

# Copy compiled JS from build stage
COPY --from=build /app/healthcheck/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
