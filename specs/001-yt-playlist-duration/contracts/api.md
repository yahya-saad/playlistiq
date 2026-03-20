# API Contract: YouTube Playlist Duration Calculator

## Endpoints

### POST /api/calculate
Calculates the aggregate duration of multiple YouTube playlists.

**Request Body**:
```json
{
  "urls": ["https://www.youtube.com/playlist?list=PL..."],
  "speed": 1.5
}
```

**Success Response (200 OK)**:
```json
{
  "totalSeconds": 3600,
  "adjustedSeconds": 2400,
  "totalVideos": 10,
  "averageDurationSeconds": 360,
  "playlists": [
    {
      "id": "PL...",
      "title": "Example Playlist",
      "durationSeconds": 3600,
      "videoCount": 10,
      "status": "success"
    }
  ],
  "errors": []
}
```

**Error Response (400/500)**:
```json
{
  "error": "Invalid request or API error",
  "details": "Playlist ID not found"
}
```

### GET /api/health
Returns the status of the backend and cache metrics.
```json
{
  "status": "ok",
  "cacheSize": 12
}
```
