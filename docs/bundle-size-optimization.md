# Bundle Size Optimization Plan

## Context

`react-modern-audio-player`는 npm에 배포되는 라이브러리로, 번들 크기가 소비자 앱의 로드 성능에 직접 영향을 미친다.
현재 세 가지 무거운 의존성(@react-spectrum, react-icons, wavesurfer.js)이 번들에 포함되어 있으며, 실제 사용량 대비 과도하게 큰 코드를 포함하고 있다.
이 작업의 목표는 외부 의존성을 제거하거나 최소화하여 라이브러리의 번들 크기를 50% 이상 절감하는 것이다.

---

## 현황 요약

| 문제 | 현재 상태 | 예상 절감 |
|------|-----------|-----------|
| `@react-spectrum` (4패키지) | 전체 디자인 시스템 import | ~20–30KB |
| `react-icons` (3 icon sets) | ~10개 아이콘만 사용, 전체 세트 번들 | ~15–25KB |
| `wavesurfer.js` | 항상 번들에 포함 | ~30–50KB (미사용 시) |
| `styled-components` | external 지정됐지만 dependencies에 포함 | peer로 이동 필요 |
| `sideEffects` 미설정 | tree-shaking 방해 | 소폭 절감 |

> **참고:** `styled-components`는 `vite.config.ts`의 `rollupOptions.external`에 이미 지정되어 있어 번들에 포함되지 않음. 단, `peerDependencies`로 이동 필요.

---

## 구현 단계

### Phase 1 — `@react-spectrum` 제거 (최우선)

**제거 대상 패키지:**
- `@react-spectrum/layout` (Flex, Grid)
- `@react-spectrum/view` (View)
- `@react-spectrum/provider`
- `@react-spectrum/theme-default`

**대체 전략:** 네이티브 HTML 요소 + CSS (styled-components 또는 inline style)

**수정 파일:**

| 파일 | 현재 | 대체 |
|------|------|------|
| `package/src/components/Grid/Grid.tsx` | `<Grid>` from spectrum | native `<div>` + CSS grid |
| `package/src/components/Grid/Item.tsx` | `<View>` from spectrum | native `<div>` |
| `package/src/components/AudioPlayer/Player/index.tsx` | `<View>` from spectrum | native `<div>` |
| `package/src/components/SortableList/SortableListItem.tsx` | `<Flex>` from spectrum | native `<div style={{display:'flex'}}>` |
| `package/src/components/AudioPlayer/Interface/Controller/index.tsx` | `<Flex>` from spectrum | native `<div style={{display:'flex'}}>` |
| `package/src/components/Provider/SpectrumProvider.tsx` | `<Provider theme={theme}>` | native `<div>` with CSS position handling |

**SpectrumProvider 대체 핵심:**
- `contextPlayerPlacement` 기반 position(fixed/static) + 좌표 계산 로직은 그대로 유지
- `Provider` → `<div>` with `className="rm-audio-player-provider"` + inline style

---

### Phase 2 — `react-icons` → 인라인 SVG 교체

**사용 중인 아이콘 목록:**

```
react-icons/md:  MdPlayCircleFilled, MdPauseCircleFilled, MdPlaylistPlay
react-icons/tb:  TbRepeatOff, TbRepeatOnce, TbRepeat, TbArrowsShuffle,
                 TbVolume3, TbVolume2, TbVolume
react-icons/im:  ImPrevious, ImNext
react-icons/lib: IconType (타입만 사용)
```

**대체 전략:** `package/src/components/icons/` 디렉토리 생성, 각 아이콘을 `FC<SVGProps<SVGSVGElement>>` 컴포넌트로 작성

**타입 대체:**
- `IconType` (react-icons) → `FC<SVGProps<SVGSVGElement>>` 또는 `FC<{ size?: number; color?: string }>`
- `IconBaseProps` → 커스텀 interface

**수정 파일:**
- `package/src/components/AudioPlayer/Interface/Controller/Button/PlayBtn.tsx`
- `package/src/components/AudioPlayer/Interface/Controller/Button/PrevNnextBtn.tsx`
- `package/src/components/AudioPlayer/Interface/Controller/Button/PlayListTriggerBtn.tsx`
- `package/src/components/AudioPlayer/Interface/Controller/Button/RepeatTypeBtn.tsx`
- `package/src/components/AudioPlayer/Interface/Controller/Button/VolumeTriggerBtn.tsx`
- `package/src/components/AudioPlayer/Interface/Controller/Tooltip/Volume/Trigger.tsx`
- `package/src/components/AudioPlayer/Interface/Controller/Icon.tsx` (IconType 타입 변경)

---

### Phase 3 — `wavesurfer.js` 동적 import

**현재:** `useWavesurfer.ts` 상단에 static import → 항상 번들에 포함

**대체 전략:**
- `WaveSurfer` 클래스를 동적 `import()` 로 lazy load
- 파형 활성화 시점(`activeUI.progress === "waveform"`)에만 로드

```ts
// 변경 전
import WaveSurfer from "wavesurfer.js";

// 변경 후 (useEffect 내부)
const WaveSurfer = (await import("wavesurfer.js")).default;
```

**수정 파일:**
- `package/src/components/AudioPlayer/Interface/Controller/Input/Progress/useWavesurfer.ts`

---

### Phase 4 — `package.json` 정리

1. `styled-components`: `dependencies` → `peerDependencies` 이동
2. `@react-spectrum/*` 4개 패키지 제거
3. `react-icons` 제거
4. `"sideEffects": false` 추가

**수정 파일:** `package/package.json`

---

### Phase 5 — Vite 빌드 설정 개선

**수정 파일:** `package/vite.config.ts`

변경 사항:
- `rollupOptions.external`에 `styled-components`가 이미 있으므로 유지
- `treeshake: { moduleSideEffects: false }` 옵션 추가
- wavesurfer dynamic import를 위해 `manualChunks` 불필요 (ESM이라 자동 분리됨)

---

## 검증 방법

1. **빌드 성공 확인**
   ```bash
   cd package && npm run build
   ```

2. **번들 크기 측정**
   ```bash
   ls -lh dist/index.es.js
   # 또는
   npx vite-bundle-visualizer
   ```

3. **Storybook에서 기능 동작 확인**
   - 재생/정지/이전/다음 버튼
   - 반복 타입 변경
   - 볼륨 조절
   - 파형 프로그레스 (wavesurfer lazy load)
   - 플레이어 position (fixed/static)

4. **타입 체크**
   ```bash
   cd package && npm run typeCheck
   ```

---

## 수정 파일 요약

```
package/package.json                                      # deps 정리
package/vite.config.ts                                    # 빌드 설정
package/src/components/icons/                             # 신규: SVG 아이콘 컴포넌트
package/src/components/Provider/SpectrumProvider.tsx      # @react-spectrum 제거
package/src/components/Grid/Grid.tsx                      # Spectrum Grid → native
package/src/components/Grid/Item.tsx                      # Spectrum View → native
package/src/components/AudioPlayer/Player/index.tsx       # Spectrum View → native
package/src/components/SortableList/SortableListItem.tsx  # Spectrum Flex → native
package/src/components/AudioPlayer/Interface/Controller/index.tsx  # Spectrum Flex → native
package/src/components/AudioPlayer/Interface/Controller/Button/PlayBtn.tsx
package/src/components/AudioPlayer/Interface/Controller/Button/PrevNnextBtn.tsx
package/src/components/AudioPlayer/Interface/Controller/Button/PlayListTriggerBtn.tsx
package/src/components/AudioPlayer/Interface/Controller/Button/RepeatTypeBtn.tsx
package/src/components/AudioPlayer/Interface/Controller/Button/VolumeTriggerBtn.tsx
package/src/components/AudioPlayer/Interface/Controller/Tooltip/Volume/Trigger.tsx
package/src/components/AudioPlayer/Interface/Controller/Icon.tsx
package/src/components/AudioPlayer/Interface/Controller/Input/Progress/useWavesurfer.ts
```
