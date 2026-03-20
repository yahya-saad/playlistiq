import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Mock data for testing without an API key
 */
const MOCK_DATA = {
  'PL-MOCK-1': { title: 'Mock Playlist 1', duration: 3661, count: 12 }, // 1h 1m 1s
  'PL-MOCK-2': { title: 'Mock Playlist 2', duration: 7200, count: 24 }  // 2h
};

// In-memory cache
const cache = new Map();

/**
 * Parses ISO 8601 duration (e.g., PT1H2M10S) to total seconds.
 */
export function parseISO8601Duration(duration) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || 0, 10);
  const minutes = parseInt(match[2] || 0, 10);
  const seconds = parseInt(match[3] || 0, 10);
  
  return (hours * 3600) + (minutes * 60) + seconds;
}

/**
 * Fetches playlist metadata and video durations.
 */
export async function getPlaylistMetadata(playlistId, range = null) {
  // Normalize range with defaults
  const normalizedRange = {
    start: (range && range.start) ? parseInt(range.start, 10) : 1,
    end: (range && range.end) ? parseInt(range.end, 10) : Infinity
  };

  const cacheKey = `${playlistId}_v${normalizedRange.start}_${normalizedRange.end}`;
  
  if (cache.has(cacheKey)) {
    console.log(`[Cache Hit] ${cacheKey}`);
    return cache.get(cacheKey);
  }

  // Handle Mock Mode
  if (API_KEY === 'MOCK' || !API_KEY) {
    const mock = MOCK_DATA[playlistId] || MOCK_DATA['PL-MOCK-1'];
    const metadata = {
      id: playlistId,
      title: `(Mock) ${mock.title}`,
      durationSeconds: mock.duration,
      videoCount: mock.count,
      status: 'success',
      timestamp: Date.now(),
    };
    cache.set(playlistId, metadata);
    return metadata;
  }

  try {
    // 1. Get playlist title and initial video count
    const playlistResponse = await axios.get(`${BASE_URL}/playlists`, {
      params: {
        part: 'snippet,contentDetails',
        id: playlistId,
        key: API_KEY,
      },
    });

    if (!playlistResponse.data.items.length) {
      throw new Error('Playlist not found');
    }

    const playlist = playlistResponse.data.items[0];
    const title = playlist.snippet.title;
    
    // 2. Fetch all video durations (pagination support for up to 500 videos)
    let totalSeconds = 0;
    let videoCount = 0;
    let filteredCount = 0;
    let nextPageToken = '';
    
    do {
      const itemsResponse = await axios.get(`${BASE_URL}/playlistItems`, {
        params: {
          part: 'contentDetails',
          playlistId: playlistId,
          maxResults: 50,
          pageToken: nextPageToken,
          key: API_KEY,
        },
      });

      const videoIds = itemsResponse.data.items.map(item => item.contentDetails.videoId).join(',');
      
      const videosResponse = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: 'contentDetails',
          id: videoIds,
          key: API_KEY,
        },
      });

      videosResponse.data.items.forEach((video, index) => {
        const absoluteIndex = videoCount + index + 1; // 1-based index
        
        if (!normalizedRange || (absoluteIndex >= normalizedRange.start && absoluteIndex <= normalizedRange.end)) {
          totalSeconds += parseISO8601Duration(video.contentDetails.duration);
          filteredCount++;
        }
      });

      videoCount += videosResponse.data.items.length;
      nextPageToken = itemsResponse.data.nextPageToken;
    } while (nextPageToken && videoCount < 500 && videoCount < normalizedRange.end);

    const metadata = {
      id: playlistId,
      title,
      durationSeconds: totalSeconds,
      videoCount: filteredCount,
      originalVideoCount: videoCount,
      status: 'success',
      timestamp: Date.now(),
    };

    cache.set(cacheKey, metadata);
    return metadata;
  } catch (error) {
    console.error(`[YT API Error] ${playlistId}:`, error.message);
    return {
      id: playlistId,
      status: 'error',
      error: error.message,
    };
  }
}
