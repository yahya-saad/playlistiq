# API Contract Updates: Enhanced UI & UX

## POST /api/calculate

Adds `range` support.

### Request Body

```json
{
  "urls": ["string"],
  "speed": 1.5,
  "range": {
    "start": 1,
    "end": 10
  }
}
```

- `range` (optional):
    - `start`: 1-based index of the first video to include.
    - `end`: 1-based index of the last video to include.

### Response Body

No change to the existing response structure, but `durationSeconds` and `videoCount` in the breakdown will reflect the filtered range if applicable.
A new field `totalVideosInPlaylist` (original count) might be added for UX clarity.

```json
{
  "totalSeconds": 3600,
  "adjustedSeconds": 2400,
  "totalVideos": 10,
  "playlists": [
    {
      "id": "...",
      "title": "...",
      "durationSeconds": 1000, // Filtered
      "videoCount": 5,          // Filtered
      "originalVideoCount": 20, // New field for context
      "status": "success"
    }
  ]
}
```
