# Data Model: YouTube Playlist Duration Calculator

## Entities

### PlaylistMetadata
Represents the cached or fetched metadata for a single playlist.
- `id`: string (YouTube Playlist ID)
- `title`: string
- `totalDurationSeconds`: number
- `videoCount`: number
- `thumbnail`: string (optional)

### CalculationSession
Represents a single request from the user (transient, not persisted).
- `playlistUrls`: string[]
- `combinedDurationSeconds`: number
- `playbackSpeed`: number
- `adjustedDurationSeconds`: number

## Relationships
- A `CalculationSession` aggregates multiple `PlaylistMetadata` objects.
- `PlaylistMetadata` is independent and reused across sessions via the backend cache.
