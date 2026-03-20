# Implementation Plan: Enhanced UI & UX Layer

**Branch**: `002-enhanced-ui-ux` | **Date**: 2026-03-20 | **Spec**: [spec.md](./spec.md)

## Summary

This feature enhances the YouTube Playlist Duration Calculator with a modern, localized UI (English/Arabic), theme support (Dark/Light), and playlist range filtering. It ensures a premium user experience with instant feedback, persistence, and shareable links while maintaining the core performance principles of the Speckit Constitution.

## Technical Context

**Language/Version**: Node.js 18+ / JavaScript (ESM)  
**Primary Dependencies**: Alpine.js, Tailwind CSS (via CDN)  
**Storage**: `localStorage` (theme, language, session persistence)  
**Performance Goals**: < 500ms TTI, < 100ms render, < 100KB gzipped load size  
**Constraints**: Zero-build frontend, minimal external libraries.

## Constitution Check

- [x] Performance: < 500ms TTI maintained.
- [x] Simplicity: Alpine.js for lightweight reactivity.
- [x] Caching: Continued use of in-memory metadata caching.
- [x] Dependency: No new heavy frameworks.

## Project Structure

```text
src/
├── app.js               # Updated for better error logging
├── services/
│   └── youtube.js       # Added range filtering logic
├── routes/
│   └── api.js           # Added range parameter support
└── public/
    ├── index.html       # Major UI overhaul, i18n, and themes
    └── i18n.js          # Translation strings
```

## Proposed Changes

### [Backend] YouTube Service & Routes

- **[MODIFY] [youtube.js](file:///d:/projects/my-project/src/services/youtube.js)**: Update `getPlaylistMetadata` to accept `range` (start, end) and filter the duration summation.
- **[MODIFY] [api.js](file:///d:/projects/my-project/src/routes/api.js)**: Update `POST /calculate` to accept a `range` object.

### [Frontend] UI & UX

- **[MODIFY] [index.html](file:///d:/projects/my-project/src/public/index.html)**: 
    - Implement Tailwind `dark` mode.
    - Add localized text bindings using Alpine.js.
    - Implement range inputs (start/end).
    - Add "Reset" and Social links.
    - Implement "Auto Paste" and "Skeleton Loaders".
- **[NEW] [i18n.js](file:///d:/projects/my-project/src/public/i18n.js)**: Central dictionary for English and Arabic strings.

## Verification Plan

### Automated Tests
- `npm test`: Verify the API correctly handles range filters (e.g., videos 2-5).

### Manual Verification
- Toggle themes and verify `localStorage` persistence.
- Toggle language and verify RTL layout.
- Paste a URL and verify auto-calculation.
- Enter a range and verify the duration is reduced.
