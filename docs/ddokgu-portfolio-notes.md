# 똑구 포트폴리오 작업 메모

이 문서는 다음 Codex 세션에서 똑구 프로젝트를 다시 다룰 때 불필요하게 코드베이스를 오래 뒤지지 않도록 남기는 작업 기준이다.

## 현재 반영 위치

- 프로젝트 상세 MDX: `content/projects/ddokgu-subscription.mdx`
- 프로젝트 라우트: `/projects/ddokgu-subscription`
- 프로젝트 목록/상세는 `src/lib/content.ts`에서 `content/projects/*.mdx`를 읽어 생성한다.
- 프로젝트 카드 컴포넌트: `src/components/project-card.tsx`
- 프로젝트 상세 페이지: `src/app/projects/[slug]/page.tsx`
- MDX 커스텀 컴포넌트: `src/components/mdx-components.tsx`
- 똑구 상세 히어로는 `heroImages`와 `heroLabel` frontmatter를 사용해 로고+폰 프레임형 앱 프리뷰로 렌더링한다.

## 현재 똑구 설명 방향

똑구는 "구독 결제 관리 앱"으로 설명해야 한다.

한 줄 소개:

> 여러 구독 서비스를 한곳에서 관리하고 결제일, 월 구독료, 알림을 확인할 수 있는 React Native 앱

기존에 임의로 들어가 있던 OCR/AI 영수증 분석 성과 중심 설명은 실제 제공 정보와 맞지 않으므로 사용하지 않는다.

단, 사용자가 제공한 스크린샷에 OCR 사진 선택/로딩/결과 화면이 있으므로 "구독 등록을 보조하는 OCR 화면 흐름" 정도로는 설명할 수 있다. AI 분석, 모델 성능, 자동화 성과처럼 확인되지 않은 표현은 넣지 않는다.

## 표현 기준

### 확정해서 말해도 되는 방향

- 앱 프론트엔드 전반 담당
- Expo / React Native 기반 iOS/Android 앱 화면 구현
- 인증, 구독 등록, 대시보드, 알림함, 온보딩, 마이페이지 흐름 구현
- React Query는 서버 상태 관리에 사용
- Zustand는 UI 상태처럼 앱 내부 상태에 한정
- SecureStore 기반 토큰 저장
- 공용 API client에서 401 응답 처리
- Expo push token 발급 및 디바이스 등록 흐름
- Mixpanel/Firebase Analytics 행동 데이터 추적

### 조심하거나 빼야 하는 표현

- Hermes와 React Native New Architecture 환경에서 이슈를 다뤘다는 표현
- 네이티브 연동 이슈를 직접 해결했다는 식의 넓은 표현
- OCR/AI 기반 영수증 분석 성과
- 모델 성능, 추천 정확도, 자동 분석 고도화처럼 근거가 없는 성과
- 운영 지표 개선 수치

## 현재 반영된 주요 내용

- 프로젝트명: 똑구
- 성격: 구독 결제 관리 앱
- 기술 스택:
  - Expo SDK 53
  - React Native 0.79
  - React 19
  - TypeScript
  - React Query
  - Zustand
  - React Navigation
  - Firebase Analytics
  - Mixpanel
- 개발 환경:
  - Expo Development Client
  - iOS/Android 앱 화면 구현
- 주요 기능:
  - 소셜 로그인
  - 구독 서비스 등록/수정/삭제
  - 결제일 대시보드
  - 알림함
  - 온보딩
  - 푸시 알림
  - 마이페이지

## 구현 포인트

### 담당 범위

- 앱 프론트엔드 전반
- 로그인 이후 주요 화면과 사용자 흐름 구현
- API 응답에 맞춘 서버 상태 관리와 화면 상태 처리
- 기기 크기별 화면 대응

### 인증

- 카카오/구글/네이버 로그인
- SecureStore 기반 토큰 저장
- 공용 API client에서 401 응답 자동 로그아웃 처리
- 네이버 로그인은 SDK 방식 대신 OIDC Authorization Code Flow로 개선
- 네이버 로그인에서 accessToken/idToken을 백엔드에 전달

### 푸시 알림

- Expo push token 발급
- `/v1/users/me/devices`로 디바이스 토큰 등록
- 빈 토큰이 서버에 전송될 수 있는 가능성 제거

### 구독 등록

- 등록 전 온보딩
- 구독 서비스 검색
- 구독 정보 입력
- OCR 사진 선택/로딩/결과 확인 화면
- OCR은 "등록 보조 흐름"으로만 설명하고, AI 성과로 포장하지 않는다.

### 대시보드

- 결제일이 가까운 서비스 리스트
- 5개 초과 시 더보기/접기
- 자연스러운 height animation
- 이번 달 구독료 확인 카드
- 소비 분석 카드
- 결제일 D-day 배지
- 무제한 배지
- 구독 성향 테스트 배너

### 알림함

- 알림이 없을 때 `ListEmptyComponent` 기반 빈 화면 추가

### 온보딩

- Figma 기준 이미지 반영
- 기기 크기별 반응형 레이아웃
- iPhone SE 대응

### 마이페이지

- 관리자 문의 모달 추가
- 제목/내용/사진 첨부 UI

## 트러블슈팅 키워드

- Naver Callback URL 문제
- Naver idToken 확보 문제
- Expo push token 발급 타이밍 문제
- 401 응답 시 인증 상태 정리
- 작은 기기 화면 겹침 대응

## 구조/협업 포인트

- React Query는 서버 상태 관리에 사용
- Zustand는 UI 상태처럼 앱 내부 상태에 한정
- 공용 API client에서 401 처리 통합
- PR 리뷰 반영
- 컴포넌트 책임 분리
- 공용 컴포넌트 변경 최소화

## 현재 반영된 스크린샷

정적 파일 위치: `public/projects/ddokgu/`

- `logo.png`: 똑구 앱 로고. 프로젝트 카드 로고 배지와 상세 히어로 로고로 사용
- `landing.png`: 서비스 첫 진입 화면
- `login.png`: 소셜 로그인 화면
- `dashboard-home.png`: 결제일 중심 대시보드
- `register-onboarding.png`: 등록 전 온보딩
- `register-search.png`: 구독 서비스 검색
- `register-form.png`: 구독 정보 입력
- `ocr-select.png`: OCR 사진 선택
- `ocr-loading.png`: OCR 분석 진행 상태
- `ocr-result.png`: OCR 결과 확인
- `dashboard-fee.png`: 이번 달 구독료 요약
- `dashboard-analysis.png`: 소비 분석 카드
- `subscription-fee.png`: 구독료 상세 확인
- `subscription-analysis.png`: 구독 분석 상세
- `tendency-landing.png`: 구독 성향 테스트 진입
- `tendency-test.png`: 구독 성향 테스트 문항
- `tendency-result.png`: 구독 성향 테스트 결과
- `notifications.png`: 알림함
- `push-notification.jpeg`: 푸시 알림 연동 결과

## 추가 스크린샷이 들어오면 우선 반영할 화면

우선순위 높은 화면:

1. 온보딩 1, 2, 3
2. 로그인 화면
3. 네이버/카카오/구글 로그인 버튼 영역
4. 대시보드 전체
5. 대시보드 구독 리스트 접힌 상태
6. 대시보드 구독 리스트 펼친 상태
7. 이번 달 구독료 확인 카드
8. 소비 분석 카드
9. 구독 서비스 등록 화면
10. 구독 상세 화면
11. 알림함 빈 화면
12. 마이페이지
13. 관리자 문의 모달
14. 푸시 알림 권한 안내 화면

스크린샷이 추가되면 `public/projects/ddokgu/`에 영어 slug 파일명으로 복사하고, MDX 본문에 이미지 섹션을 추가한다.

상세 히어로 오른쪽 영역은 세로 모바일 스크린샷 한 장을 크게 `cover`로 자르면 어색하다. `heroImages`에는 대표 화면 3장을 넣고, 상세 페이지에서 작은 폰 프레임 3개로 보여주는 현재 방식을 유지한다.

## 다음에 개선하면 좋은 작업

- "기술 스택과 구조" 섹션에 앱 구조도 추가
- 네이버 로그인 OIDC 흐름을 간단한 단계형 다이어그램으로 정리
- 푸시 알림 토큰 등록 흐름을 코드/시퀀스 중심으로 보강
- 대시보드 UX 개선 전후를 스크린샷으로 비교
- 마이페이지/관리자 문의 모달 스크린샷이 들어오면 해당 섹션에 추가

## 블로그 글로 확장할 때 제목 후보

- React Native로 구독 관리 앱 만들기: 똑구 개발기
- Expo + React Native로 만든 구독 결제 관리 앱 개발 회고
- 소셜 로그인부터 푸시 알림까지, 똑구 앱 개발 과정 정리
- React Native 앱에서 네이버 로그인과 구독 알림을 구현하며 배운 것들

## 블로그 글 구성 후보

1. 프로젝트 소개
2. 왜 만들었는지
3. 주요 기능
4. 기술 스택과 구조
5. 핵심 구현 사례
6. 트러블슈팅
7. UX 개선 작업
8. 협업하며 개선한 점
9. 배운 점과 다음 개선 방향

## 검증 기록

- `npm run build` 통과
- Next.js 정적 생성에서 `/projects/ddokgu-subscription` 생성 확인
- 2026-06-11 기준 개발 서버는 `http://localhost:3000`에서 실행 확인

## 주의

- 이 저장소에는 현재 똑구 외 다른 AI 글, 블로그 글, 컴포넌트 변경이 많이 섞여 있다.
- 똑구 작업만 할 때는 `content/projects/ddokgu-subscription.mdx`와 이 메모 파일 중심으로 확인한다.
- 사용자가 제공한 실제 앱 자료와 다른 추측성 기능은 추가하지 않는다.
