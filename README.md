# react-modern-audio-player

Modern, customizable React audio player with waveform visualization, drag-and-drop playlist, WAI-ARIA accessibility, TypeScript-first API, and Next.js App Router (Server Components) support.

[![npm](https://img.shields.io/npm/v/react-modern-audio-player.svg)](https://www.npmjs.com/package/react-modern-audio-player)
[![license](https://img.shields.io/npm/l/react-modern-audio-player.svg)](./LICENSE)

**[Full documentation → `package/README.md`](./package/README.md)**

## Install

```bash
npm install react-modern-audio-player
```

```tsx
import AudioPlayer from "react-modern-audio-player";

const playList = [
  { id: 1, src: "audio.mp3", name: "Track 1", writer: "Artist", img: "cover.jpg" },
];

export default function Page() {
  return <AudioPlayer playList={playList} />;
}
```

Requires React 18 or newer.

## Repository layout

This is a yarn workspaces monorepo. The published npm package is `package/` — everything else is development tooling.

| Path | Contents |
| --- | --- |
| `package/` | The published library. Source in `package/src/`, docs in `package/README.md` |
| `storybook/` | Storybook workspace for visual development |
| `test/e2e/` | Playwright end-to-end specs |
| `test/integration/` | Integration tests |
| `agents/`, `conventions/` | Instructions and naming rules for coding agents — see [AGENTS.md](./AGENTS.md) |

## Development

Requires Node.js 20+ and yarn 4 (enable with `corepack enable`).

| Task | Command | Run from |
| --- | --- | --- |
| Install | `yarn install` | root |
| Build the library | `yarn build` | root |
| Dev server | `yarn dev` | `package/` |
| Unit tests | `yarn test:unit` | `package/` |
| Integration tests | `yarn test:integration` | `package/` |
| All Vitest tests | `yarn test` | `package/` |
| Coverage | `yarn test:coverage` | `package/` |
| Type check | `yarn typeCheck` | `package/` |
| Lint and fix | `yarn lint` | root |
| End-to-end tests | `yarn test:e2e` | root |

## Contributing

Branch from `develop`, and follow the commit and pull request rules in [AGENTS.md](./AGENTS.md).

## License

MIT © [MAXX](https://github.com/slash9494)
