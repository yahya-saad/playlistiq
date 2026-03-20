# Research: YouTube Playlist Duration Calculation Strategy

## YouTube API v3 Integration

### Fetching Playlist Items
To get video durations for a playlist, we must use two endpoints:
1. `playlistItems.list`: To get the list of video IDs in a playlist.
   - Max 50 items per call.
   - Requires `playlistId`.
2. `videos.list`: To get the `contentDetails` (including `duration`) for those IDs.
   - We can pass multiple IDs (comma-separated).

### Duration Parsing
YouTube returns durations in **ISO 8601** format (e.g., `PT1M13S`, `PT1H2M10S`).
- Solution: Use a regex-based parser or a lightweight library to convert this to total seconds.
- Implementation: `src/services/youtube.js` will contain the parsing logic.

## Caching Strategy

### In-Memory Map
- key: `playlistId`
- value: `{ duration: number, items: number, timestamp: number }`
- TTL: 1 hour (configurable).

## Frontend Implementation

### Alpine.js + Tailwind (Zero Build)
- Include Alpine.js and Tailwind via CDN in `index.html`.
- State management: `x-data` for the URL list, speed, and results.
- Feedback: Instant reactivity when playback speed changes.

## Decisions

- **API Library**: `axios` for simplicity and lightweight footprint.
- **Caching**: Simple `Map` on the server.
- **Error Handling**: Graceful fallback for non-existent playlists or private items.
