# docker production image build
# Finally, we give up to use standalone image for production... It's too buggy...

# Step 1: Base image with Node.js
FROM node:18-alpine AS base

# Install dependencies only when needed
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  apk add --no-cache tzdata && \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Step 2: Build the application
FROM base AS builder
WORKDIR /app
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Step 3: Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV TZ=Asia/Seoul

RUN apk add --no-cache tzdata && \
  cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
  echo "Asia/Seoul" > /etc/timezone && \
  addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.production ./.env.production
COPY --from=builder /app/.env ./.env

# Create cache directory for images
RUN mkdir -p /app/.next/cache/images && \
  chown -R nextjs:nodejs /app/.next/cache



USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]

