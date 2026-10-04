# Web Video Editor

A modern, professional video editing workspace built with cutting-edge web technologies.

## Features

✨ **Modern Stack**
- Vite for fast builds and HMR
- React 18 with TypeScript
- Zustand for lightweight state management
- Dexie for local database persistence
- PixiJS for GPU-accelerated rendering
- Radix UI for accessible, unstyled components
- Tailwind CSS v4 with new `@tailwindcss/vite`

🎬 **Editor Features**
- Multi-track timeline editor
- Clip library and management
- Real-time preview canvas with PixiJS
- Inspector panel for properties
- Effect system (color grade, blur, glow, sharpen)
- Playback controls with scrubbing
- Project settings and export

🌙 **UX & Accessibility**
- Dark theme by default with theme switcher
- Responsive design
- PWA support for offline use
- Keyboard shortcuts ready
- WCAG-compliant Radix UI components

## Project Structure

```
src/
├── components/       # React components (Header, Sidebar, Canvas, etc.)
├── store/           # Zustand stores (editorStore, themeStore)
├── hooks/           # Custom React hooks (usePixiCanvas, useLocalStorage, useDebounce)
├── db/              # Dexie database setup and operations
├── types/           # TypeScript types and interfaces
├── App.tsx          # Root application component
├── index.css        # Tailwind CSS configuration
└── main.tsx         # Entry point
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Type Checking

```bash
npm run lint
```

## Architecture

### State Management

The app uses **Zustand with Immer middleware** for predictable, immutable state updates.

- `editorStore`: Manages editor state (clips, projects, playback, UI state)
- `themeStore`: Manages theme preference with localStorage persistence

### Database

**Dexie** provides IndexedDB access for persistent storage:
- Projects (with clips)
- Clips (with effects)
- Local persistence for user work

### Canvas Rendering

**PixiJS** provides GPU-accelerated 2D rendering:
- `usePixiCanvas` hook for canvas setup
- Sprite management
- Stage clearing and resizing
- 60fps rendering by default

### UI Components

All interactive elements use **Radix UI** primitives:
- `react-dialog` for modals
- `react-dropdown-menu` for menus
- `react-slider` for range inputs
- `react-tooltip` for contextual help
- `react-tabs` for tabbed interfaces
- `react-switch` for toggles

## Configuration

### Tailwind CSS v4

Tailwind is integrated via `@tailwindcss/vite` for faster builds:

```bash
npm install -D @tailwindcss/vite
```

### PWA Configuration

Configured in `vite.config.ts` with `vite-plugin-pwa`:
- Auto service worker updates
- Offline support
- App manifest

## Roadmap

- [ ] Audio track support
- [ ] Keyframe animations
- [ ] Filter presets
- [ ] Export formats (MP4, WebM, GIF)
- [ ] Collaborative editing
- [ ] AI-powered enhancements
- [ ] Plugin system

## License

MIT
