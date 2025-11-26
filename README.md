# Frontend Project

Next.js 기반 프론트엔드 프로젝트입니다.

## 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: Zustand
- **HTTP 클라이언트**: Fetch API
- **린트/포매터**: ESLint, Prettier
- **패키지 매니저**: Yarn

## 시작하기

### 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
yarn build
```

### 프로덕션 실행

```bash
yarn start
```

### 린트

```bash
yarn lint
```

### 포맷팅

```bash
yarn format
```

## 프로젝트 구조

```
src/
├── app/                 # Next.js App Router 페이지
│   ├── layout.tsx      # 루트 레이아웃
│   ├── page.tsx        # 홈 페이지
│   └── globals.css     # 전역 스타일
├── components/          # 재사용 가능한 컴포넌트
│   ├── Home/           # 홈 관련 컴포넌트
│   └── TopBar.tsx      # 상단 바 컴포넌트
├── pages/              # 페이지 컴포넌트 (레거시)
├── hooks/              # 커스텀 훅
├── stores/             # Zustand 스토어
├── apis/               # API 클라이언트
├── types/              # TypeScript 타입 정의
├── routers/            # 라우팅 설정
└── utills/             # 유틸리티 함수
```

## 환경 변수

`.env.local.example` 파일을 `.env.local`로 복사하고 필요한 환경 변수를 설정하세요.

```bash
cp .env.local.example .env.local
```

## 주요 기능

- **Zustand를 활용한 상태 관리**: `src/stores/` 디렉토리에서 전역 상태 관리
- **Fetch API 기반 HTTP 클라이언트**: `src/apis/httpClient.ts`에서 API 통신
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **TypeScript**: 타입 안정성 보장

## 참고 사항

- Next.js App Router를 사용하여 서버 컴포넌트와 클라이언트 컴포넌트를 구분합니다.
- 클라이언트 컴포넌트에는 `'use client'` 지시문을 추가해야 합니다.
- API 라우트는 `src/app/api/` 디렉토리에 추가할 수 있습니다.
