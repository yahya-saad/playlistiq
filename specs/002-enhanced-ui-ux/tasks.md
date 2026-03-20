# Tasks: Enhanced UI & UX Layer

**Input**: Design documents from `specs/002-enhanced-ui-ux/`
**Prerequisites**: plan.md, spec.md, research.md, contracts/

## Phase 1: Foundational (Infrastructure)

- [x] T001 Create `src/public/translations.js` with EN and AR strings
- [x] T002 Implement `theme` and `lang` stores in Alpine.js (`src/public/index.html`)
- [x] T003 [P] Configure RTL/LTR direction switching via `:dir` attribute

---

## Phase 2: Core Backend - Range Filtering (Priority: P1)

- [x] T004 Update `src/services/youtube.js` to accept `start` and `end` indices
- [x] T005 [P] Implement slicing logic in duration summation (`src/services/youtube.js`)
- [x] T006 Update `src/routes/api.js` to pass range params from request body

---

## Phase 3: Modern UI Overhaul (Priority: P1) 🎯 UI MVP

- [x] T007 Implement Dark/Light mode theme switching with Tailwind `dark:` classes
- [x] T008 [P] Redesign main calculator card with premium glassmorphism and modern gradients
- [x] T009 [US1] Implement full i18n binding for all UI text and placeholders
- [x] T010 [P] Add reset button and footer with GitHub/LinkedIn social links

---

## Phase 4: Advanced Interaction UX (Priority: P2)

- [x] T011 [US2] Add optional Range Input fields (Start/End) to calculations
- [x] T012 [US3] Implement "Auto Paste" detection for YouTube URLs
- [x] T013 [P] Add "Copy Toast" feedback for clipboard results
- [x] T014 Implement URL parameter parsing (`?playlists=...&speed=...`)

---

## Phase 5: Persistence & Polish (Priority: P3)

- [x] T015 [P] Add loading skeletons for result cards and breakdown table
- [x] T016 Implement `localStorage` persistence for URLs, speed, range, theme, and language
- [x] T017 Final pass on RTL alignment and mobile responsiveness
- [x] T018 Code cleanup and removal of any redundant CSS/JS
