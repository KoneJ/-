# ===== 의존성 설치 단계 =====
FROM node:22-alpine AS deps

WORKDIR /app

# Yarn 설치
RUN corepack enable && corepack prepare yarn@1.22.19 --activate

# 의존성 파일만 먼저 복사 (캐시 활용)
COPY package.json yarn.lock ./

# 의존성 설치
RUN yarn install --frozen-lockfile

# ===== 빌드 단계 =====
FROM node:22-alpine AS builder

WORKDIR /app

# Yarn 설치
RUN corepack enable && corepack prepare yarn@1.22.19 --activate

# 의존성 복사
COPY --from=deps /app/node_modules ./node_modules

# 소스 코드 복사
COPY . .

# 환경 변수 설정 (빌드 시 필요한 경우)
# ENV NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Next.js 빌드
RUN yarn build

# ===== 프로덕션 실행 단계 =====
FROM node:22-alpine AS runner

WORKDIR /app

# Yarn 설치
RUN corepack enable && corepack prepare yarn@1.22.19 --activate

ENV NODE_ENV=production

# 보안을 위한 비root 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 빌드 산출물 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 권한 설정
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
