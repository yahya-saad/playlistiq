# Tasks: YouTube Playlist Duration Calculator

**Input**: Design documents from `specs/001-yt-playlist-duration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Create project structure per implementation plan (`src/`, `src/services/`, `src/routes/`, `src/public/`, `tests/`)
- [x] T002 Initialize Node.js project and install dependencies (`express`, `axios`, `dotenv`, `jest`, `supertest`)
- [x] T003 [P] Configure `.gitignore` and `.env.example`

---

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T004 Implement ISO8601 duration parser and sum logic in `src/services/youtube.js`
- [x] T005 Implement YouTube API client with in-memory caching Map in `src/services/youtube.js`
- [x] T006 Setup Express app skeleton and middleware in `src/app.js`
- [x] T007 [P] Implement global error handling and 404 middleware
- [x] T008 [Constitution] Configure performance logging for API response times
- [x] T021 Update API contract and service to include `totalVideos` and `averageDurationSeconds`

---

## Phase 3: User Story 1 - Single Playlist Duration (Priority: P1) 🎯 MVP

**Goal**: Calculate duration for one playlist via a simple input.
**Independent Test**: Paste one valid URL in the UI and verify HH:MM:SS result.

- [x] T009 [P] [US1] Create calculation route in `src/routes/api.js`
- [x] T010 [US1] Implement playlist metadata fetching for a single URL in `src/routes/api.js`
- [x] T011 [P] [US1] Create basic `src/public/index.html` with Alpine.js and Tailwind (CDN)
- [x] T012 [US1] Implement frontend fetch logic, loading states, and result display for one playlist

---

## Phase 4: User Story 2 - Multiple Playlists Combined (Priority: P2)

**Goal**: Support multiple URLs via bulk input and show breakdown.
**Independent Test**: Paste two URLs (one per line) and verify sum + breakdown table.

- [x] T013 [US2] Implement parallel fetching for an array of URLs and return breakdown
- [x] T014 [US2] Update `src/public/index.html` with multi-line textarea and breakdown table
- [x] T015 [US2] Implement duplicate detection and private/unavailable video handling and skip logic (US requirements)

---

## Phase 5: User Story 3 - Custom Playback Speed (Priority: P3)

**Goal**: Adjust total duration based on selected speed.
**Independent Test**: Select "2x" and verify duration is halved.

- [x] T016 [US3] Add speed selector (preset + custom) to `src/public/index.html`
- [x] T017 [US3] Implement client-side reactive calculation for adjusted duration in Alpine.js
- [x] T022 [US3] Add "Copy Results" button to UI and implement clipboard logic

---

## Phase 6: Polish & Performance

- [x] T018 Code cleanup and final performance check (verify < 500ms TTI)
- [x] T019 Final UI polishing (error states, loading indicators)
- [x] T020 Run `quickstart.md` validation scenarios
