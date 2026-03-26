# React-modern-audio-player

## v2.0.0 (Unreleased)

### Breaking Changes

- **`AudioData.name` type narrowed**: `string | ReactNode` → `string`
  - If you were passing a ReactNode as `name`, use `customTrackInfo` instead
- **`AudioData.writer` type narrowed**: `string | ReactNode` → `string`
  - If you were passing a ReactNode as `writer`, use `customTrackInfo` instead

---

## v1.2.1

### apply release git action