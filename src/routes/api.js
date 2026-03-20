import express from 'express';
import { getPlaylistMetadata } from '../services/youtube.js';

const router = express.Router();

/**
 * Extract playlist ID from various YouTube URL formats or use directly if ID.
 */
function extractPlaylistId(url) {
  const match = url.match(/[?&]list=([^#&?]+)/);
  return match ? match[1] : url;
}

/**
 * POST /api/calculate
 */
router.post('/calculate', async (req, res) => {
  const { urls, speed = 1, range = null } = req.body;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid input: urls must be an array' });
  }

  // Remove duplicates
  const uniqueUrls = [...new Set(urls.filter(url => url.trim().length > 0))];
  
  // Parallel fetching (User Requirement)
  const results = await Promise.all(
    uniqueUrls.map(url => getPlaylistMetadata(extractPlaylistId(url), range))
  );

  let totalSeconds = 0;
  let totalVideos = 0;
  const playlists = [];
  const errors = [];

  results.forEach(res => {
    if (res.status === 'success') {
      totalSeconds += res.durationSeconds;
      totalVideos += res.videoCount;
      playlists.push(res);
    } else {
      errors.push({ id: res.id, error: res.error });
    }
  });

  const adjustedSeconds = totalSeconds / speed;
  const averageDurationSeconds = totalVideos > 0 ? totalSeconds / totalVideos : 0;

  res.json({
    totalSeconds,
    adjustedSeconds,
    totalVideos,
    averageDurationSeconds,
    playlists,
    errors
  });
});

export default router;
