# HANDOFF — R37 RUNNERS 뜀박질 입력

**최종 업데이트**: 2026-06-12  
**저장소**: https://github.com/settler2332/firsttime  
**라이브 URL**: https://settler2332.github.io/firsttime/landing/

---

## 프로젝트 개요

R37 RUNNERS 러닝 클럽을 위한 단일 페이지 웹앱.  
두 개의 독립 섹션으로 구성됨:

1. **뜀박질 입력** (상단) — 날짜·이름·거리를 입력하면 Google Sheets에 자동 기록
2. **오늘의 타로** (하단) — 라이더-웨이트 카드 3장 무작위 뽑기 + 운세 + 로또 번호 5게임

---

## 파일 구조

```
landing/
├── index.html   — 마크업 (두 섹션 + 헤더/푸터)
├── style.css    — 다크/라이트 테마, CSS 변수 기반 디자인 시스템
├── script.js    — 테마 토글 로직
├── tarot.js     — 타로 카드 데이터, 카드 뽑기·렌더링·로또 로직
├── runner.js    — Google Sheets 연동 폼 (JSONP 방식)
└── Code.gs      — Google Apps Script 소스 (별도 배포 필요, 저장소는 참고용)
```

---

## Google Sheets 연동 구조

### 스프레드시트
- **ID**: `1ulOiIklFcdXfbtiI3_gh4h9kK1rHI9EpqLvrFr7N2Co`
- **시트 이름 규칙**:
  - 2025년: `6월`, `7월` 형식
  - 2026년~: `26_1월`, `26_6월` 형식 (`Code.gs`에서 자동 분기)
- **헤더 위치**: 7행 (코드는 최대 10행까지 자동 탐색)
- **필수 열**: `이름`, `N일` (예: `11일`)

### Apps Script
- **배포 URL**: `runner.js` 상단의 `SCRIPT_URL` 참고
- **CORS 우회 방식**: JSONP — `fetch()` 사용 불가 (Apps Script URL이 다른 도메인으로 302 리다이렉트하면서 CORS 헤더 누락)
- **`doGet` 흐름**: URL 파라미터 수신 → `handleRequest()` → 결과를 `callback(JSON)` 형태로 반환

### Apps Script 재배포 방법
1. [script.google.com](https://script.google.com) 접속 → 해당 프로젝트 열기
2. `Code.gs` 내용을 저장소의 `landing/Code.gs`로 전체 교체
3. **[배포] > [배포 관리] > 편집(연필) > 새 버전 선택 > 배포**
4. 기존 배포 URL 유지됨 — `runner.js`의 `SCRIPT_URL` 수정 불필요

---

## 주요 기술 결정

| 결정 | 이유 |
|------|------|
| JSONP (fetch 대신) | Apps Script URL의 302 리다이렉트가 CORS 헤더를 포함하지 않음 |
| jsDelivr CDN (타로 이미지) | Wikimedia Commons 직접 링크가 400 오류 반환 |
| CSS 변수 기반 테마 | `data-theme` 속성 전환만으로 다크/라이트 전환 |
| 헤더 최대 10행 탐색 | 시트의 실제 헤더가 7행에 위치 |

---

## 알려진 이슈 / 후속 작업

- **카카오톡 링크 미리보기 캐시**: OG 태그 적용 완료. 구 캐시가 남아 있으면 [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 URL 입력 후 캐시 초기화
- **Apps Script 미인증 경고**: 본인 계정 스크립트이므로 최초 1회 "계속" 클릭으로 정상 작동
- **2027년 이후 시트 이름**: 현재 로직은 `27_1월` 형식으로 자동 처리되나, 실제 시트 탭 이름과 일치하는지 확인 필요

---

## 디자인 토큰 (style.css :root)

| 변수 | 다크 | 라이트 |
|------|------|--------|
| `--bg` | `#0a0a0a` | `#f5f5f2` |
| `--surface` | `#111111` | `#ffffff` |
| `--accent` (타로) | `#c8ff00` | `#4a7a00` |
| 러닝 버튼 초록 | `#22c55e` | `#16a34a` |

---

## 커밋 히스토리 요약

| 커밋 | 내용 |
|------|------|
| `828b4ce` | OG 메타 태그 추가 (카카오톡 미리보기) |
| `1037dfb` | 섹션 순서 변경: 뜀박질 입력 → 타로 순 |
| `f7caccf` | 뜀박질 입력을 독립 섹션으로 재구성, 초록 버튼 |
| `5dfddca` | 헤더 탐색 범위 10행으로 확장 (이름 열 7행) |
| `3c490ed` | 연도별 시트 이름 형식 처리 (26_N월) |
| `4284bae` | JSONP 방식으로 CORS 오류 수정 |
| `7943cac` | 러닝 기록 입력 폼 추가 (Google Sheets 연동) |
| `9e49838` | 로또 번호 5게임 + 오늘의 러닝 거리 추가 |
| `ec97b52` | 타로 운세 전용 페이지로 개편 |
| `0ae242a` | 타로 카드 운세 기능 최초 추가 |
| `c8de607` | 다크/라이트 모드 토글 추가 |
