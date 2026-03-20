# Quickstart: YouTube Playlist Duration Calculator

## Prerequisites
- Node.js 18+
- YouTube Data API v3 Key

## Setup
1. Clone the repository and navigate to the project root.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your YouTube API Key in a `.env` file:
   ```env
   YOUTUBE_API_KEY=your_key_here
   ```

## Development
1. Start the server:
   ```bash
   npm start
   ```
2. Navigate to `http://localhost:3000` in your browser.

## Validation Scenarios
1. **Single Playlist**: Paste `https://www.youtube.com/playlist?list=PLBCF2DAC6FFB16301` (6 items). Verify the duration at 1x and 2x.
2. **Multiple Playlists**: Paste two different URLs and verify the combined total matches their sum.
3. **Invalid Input**: Paste a malformed string and verify the UI shows an "Invalid URL" error.
