# Feature Specification: Enhanced UI & UX Layer

**Feature Branch**: `002-enhanced-ui-ux`  
**Created**: 2026-03-20  
**Status**: Draft  
**Input**: User description: "Enhance the existing YouTube Playlist Duration Calculator with a modern, lightweight UI, localization support, optional filtering features, and improved usability..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Personalized Themes & Localization (Priority: P1)

As a user, I want to toggle between light/dark modes and switch between English/Arabic so that I can use the application comfortably in my preferred environment and language.

**Why this priority**: Essential for global accessibility and modern UX standards.
**Independent Test**: Can be fully tested by clicking the theme/language toggles and verifying visual/text changes.

**Acceptance Scenarios**:
1. **Given** the app is in English, **When** I click the Arabic toggle, **Then** the UI layout switches to RTL and all text is translated.
2. **Given** the system preference is Dark, **When** I first load the app, **Then** it starts in Dark mode.
3. **Given** the app is in Light mode, **When** I toggle to Dark mode, **Then** the preference is saved for future visits.

---

### User Story 2 - Partial Playlist Calculation (Priority: P2)

As a user, I want to specify a start and end video index so that I can calculate the duration of specific sections of a series (e.g., "videos 10 to 20").

**Why this priority**: Key utility for users following long courses or series in parts.
**Independent Test**: Can be tested by entering a range (e.g., 2 to 5) for a 10-video playlist and verifying the duration matches only those videos.

**Acceptance Scenarios**:
1. **Given** a 50-video playlist, **When** I set range Start: 10 and End: 20, **Then** the total duration reflects only videos 10 through 20.
2. **Given** an invalid range (e.g., Start > End), **When** I attempt to calculate, **Then** an error message "End index must be greater than start index" is shown.

---

### User Story 3 - Instant Feedback & Smart Inputs (Priority: P3)

As a user, I want the app to automatically detect pasted URLs, show loading skeletons, and provide keyboard shortcuts so that my workflow is as fast as possible.

**Why this priority**: Aligns with the "Ultra Fast" constitution principle and improves power-user efficiency.
**Independent Test**: Can be tested by pasting a URL and seeing the calculation trigger or validation appear instantly.

**Acceptance Scenarios**:
1. **Given** an empty input, **When** I paste a valid YouTube URL, **Then** the URL is detected and processed without needing an extra click (Auto Paste).
2. **Given** a calculation is in progress, **When** waiting for a response, **Then** the UI shows a skeleton loader matching the result cards.
3. **Given** the input area is focused, **When** I press `Enter`, **Then** the calculation is triggered.

---

### Edge Cases

- **Arabic Text Overflow**: Ensure long playlist titles don't break the RTL layout.
- **Range Out of Bounds**: If a user enters End: 100 on a 50-video playlist, the system should cap it at 50 or show a warning.
- **Mixed Input**: Handle cases where one URL is valid and another is caught by inline validation.
- **RTL Alignment**: Ensure that even with RTL, numeric durations (HH:MM:SS) remain readable (often LTR formatting for time).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support Light and Dark themes, persisting the choice in `localStorage`.
- **FR-002**: System MUST support English and Arabic (RTL) localization.
- **FR-003**: System MUST provide optional Start and End index inputs for range filtering.
- **FR-004**: System MUST apply the video range (start/end) to each playlist individually if multiple playlists are provided.
- **FR-005**: System MUST include a "Reset" button to clear all inputs, ranges, and results.
- **FR-006**: System MUST detect YouTube URLs on paste and trigger extraction/validation.
- **FR-007**: System MUST show a loading state (spinner or skeleton) during API calls.
- **FR-008**: System MUST include social links (GitHub, LinkedIn) in the footer opening in new tabs.
- **FR-009**: System MUST support `Enter` to calculate and `Ctrl+Enter` for multi-line support.
- **FR-010**: System MUST support shareable links via URL parameters (`?playlists=...&speed=...`).

### Key Entities

- **Settings**: Represents user preferences (theme, language).
- **Filter**: Represents a sequence range (start, end).
- **Session**: Persisted state (playlists, speed, filter) for "Save Last Session" feature.

## Success Criteria *(mandatory)*

### Performance & Efficiency (Constitution MANDATORY)

- **SC-P01**: User interaction latency MUST be < 500ms (Time to Interactive).
- **SC-P02**: UI MUST render initial state in < 100ms.
- **SC-P03**: Initial load size (JS/CSS) MUST be < 100KB gzipped.

### Measurable Outcomes

- **SC-010**: Language switching MUST complete in < 150ms.
- **SC-011**: Theme toggle MUST complete in < 100ms with no layout shift.
- **SC-012**: 100% of functional requirements must have verified [P1/P2] test coverage.

## Assumptions

- **Range Default**: If no range is specified, the full playlist is calculated.
- **Persistence**: `localStorage` is used for theme and last session as no account is required.
- **Localization**: Translation strings will be managed in a simple JSON-like object on the client side.
