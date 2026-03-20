# Feature Specification: [FEATURE NAME]

**Feature Branch**: `001-yt-playlist-duration`  
**Created**: 2026-03-20  
**Status**: Draft  
**Input**: User description: "Build a web application that calculates the total duration of one or more YouTube playlists..."

## Clarifications

### Session 2026-03-20
- **Q1: YouTube API Integration & Key Management** → **A: Option A** (Server-Side Key). The application uses a hardcoded or environment-variable API key on the backend to avoid exposing keys and to facilitate centralized caching.
- **Q2: Playlist Input Method** → **A: Option A** (Bulk Input). Users provide multiple playlist URLs via a single multi-line text area (one URL per line).
- **Q3: Result Presentation & Breakdown** → **A: Option B** (Aggregate with Breakdown). Show the combined total at the top, followed by a list of each playlist and its individual duration.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Single Playlist Duration (Priority: P1)

As a user, I want to paste a YouTube playlist URL into a simple input field so that I can instantly see the total duration of all videos in that playlist.

**Why this priority**: Core functionality and MVP.
**Independent Test**: Can be fully tested by pasting one valid playlist URL and verifying the 1x duration output.

**Acceptance Scenarios**:
1. **Given** a valid YouTube playlist URL, **When** I paste it and click "Calculate", **Then** the total duration (HH:MM:SS) is displayed.
2. **Given** an invalid or empty URL, **When** I attempt to calculate, **Then** a clear error message "Invalid Playlist URL" is shown.

---

### User Story 2 - Multiple Playlists Combined (Priority: P2)

As a user, I want to add multiple playlist URLs to a single calculation so that I can see the aggregate duration of several series or courses.

**Why this priority**: Key differentiator and specific user requirement.
**Independent Test**: Can be tested by adding two valid playlists and verifying the sum of their individual durations.

**Acceptance Scenarios**:
1. **Given** two valid playlist URLs, **When** I add both, **Then** the total combination duration and a breakdown for each playlist are displayed.
2. **Given** one valid and one private playlist, **When** I add both, **Then** the system calculates the valid one, shows its duration, and provides a warning for the private one.

---

### User Story 3 - Custom Playback Speed (Priority: P3)

As a user, I want to select a playback speed (e.g., 1.5x) so that I can know how long it will take me to watch the content at my preferred speed.

**Why this priority**: Enhances utility for learners and content consumers.
**Independent Test**: Can be tested by selecting "1.5x" and verifying that the adjusted duration is exactly (Total Duration / 1.5).

**Acceptance Scenarios**:
1. **Given** a calculated total duration of 60 minutes, **When** I select "2x" playback speed, **Then** the adjusted duration is shown as 30 minutes.

---

### Edge Cases

- **Private/Unavailable Videos**: The system should skip these videos and notify the user (e.g., "3 videos were skipped because they are private").
- **Empty Playlists**: Return "0m 0s" and a note that the playlist is empty.
- **Duplicate URLs**: Detect and ignore duplicate playlist URLs in the same calculation.
- **Massive Playlists**: Ensure the UI remains responsive even for playlists with hundreds of videos.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST accept one or more YouTube playlist URLs (IDs or full URLs) via a multi-line text area.
- **FR-002**: System MUST fetch video durations using a server-side managed YouTube Data API key.
- **FR-003**: System MUST display the aggregate duration at 1x speed in Hours, Minutes, and Seconds.
- **FR-008**: System MUST display a breakdown of each input playlist's individual duration.
- **FR-004**: System MUST provide a selector for common playback speeds (1.25x, 1.5x, 1.75x, 2x) and a custom input.
- **FR-005**: System MUST update the "Adjusted Duration" instantly when speed or playlists change.
- **FR-006**: System MUST skip unavailable/private videos without crashing the calculation.
- **FR-007**: System MUST be a standalone web application (no auth required).

### Key Entities

- **Playlist**: Represents a YouTube playlist with an ID, title, and a list of video durations.
- **Calculation**: Represents the current session's aggregate data (total seconds, selected speed, adjusted seconds).

## Success Criteria *(mandatory)*

### Performance & Efficiency (Constitution MANDATORY)

- **SC-P01**: User interaction latency MUST be < 500ms (Time to Interactive).
- **SC-P02**: API response time MUST be < 200ms (p95) for all primary endpoints (utilize aggressive caching for metadata).
- **SC-P03**: No new database dependencies.

## Assumptions

- **Input Method**: Users will provide multiple playlist URLs via a single multi-line text area for maximum speed and simplicity.
- **API Limits**: The system assumes the use of the YouTube Data API and will handle rate limiting gracefully.
- **Metadata Scope**: Calculation is based on the `duration` field of the `contentDetails` in the YouTube API.

### Measurable Outcomes

- **SC-010**: Users can get their first calculation result in under 10 seconds of landing on the page.
- **SC-011**: Error feedback for invalid URLs MUST appear in under 300ms.
- **SC-012**: The application size (JS/CSS) MUST be under 100KB gzipped.
