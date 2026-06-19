FROM node:22-alpine AS base
WORKDIR /app

# ---- deps ----
FROM base AS deps
COPY apps/api/dist/package.json apps/api/dist/package-lock.json ./
RUN npm ci --omit=dev

# ---- runtime ----
FROM base AS runner
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY apps/api/dist/ ./

EXPOSE 3333
CMD ["node", "main.js"]
