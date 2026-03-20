# PlaylistIQ - YouTube Playlist Analysis

Optimize your content consumption with instant analytics for every YouTube playlist in your queue.

## Features

- **Multi-Playlist Support**: Analyze multiple playlists simultaneously for a total time count.
- **Advanced Speed Control**: Instant duration calculation for preset speeds (1.25x, 1.5x, 2x) or any **Custom Speed** (e.g., 1.75x).
- **Robust Segment Filtering**: Specify a start and end video index. Handles partial inputs (Start-only or End-only) with smart defaults.
- **Direct Navigation**: Clickable playlist titles in the results table to open original playlists instantly.
- **Shareable Links**: Current queue, speed, and range filters are encoded in the URL for seamless sharing.
- **Automatic Persistence**: Saves your session data locally so you never lose your progress.
- **Clean, Professional UI**: A high-density dashboard built for productivity and precision.

## Tech Stack

- **Backend**: Node.js & Express (ES Modules)
- **Frontend**: Alpine.js & Tailwind CSS (Minified Production Build)
- **Icons**: Lucide
- **API**: YouTube Data API v3

## Setup

### Prerequisites
- Node.js 20+
- YouTube Data API Key

### Quick Start
1. Clone the repository.
2. Create `.env` from `.env.example` and add your `YOUTUBE_API_KEY`.
3. Commands:
```bash
npm install
npm run build:css
npm start
```

### Docker Deployment
```bash
docker build -t playlistiq .
docker run -p 3000:3000 --env-file .env playlistiq
```

## Attribution
Built by **Yahya Saad** © 2026.
