const express = require('express');
const axios = require('axios');
const app = express();
const port = 8000; // Change this if you want to use a different port

// Endpoint to get video IDs from a playlist
app.get('/playlist/:playlistId', async (req, res) => {
    const playlistId = req.params.playlistId;
    const apiUrl = `https://yt.lemnoslife.com/playlist/${playlistId}/videos`;

    try {
        const response = await axios.get(apiUrl);
        const videos = response.data.items;
        
        // Extract video IDs from the response
        const videoIds = videos.map(video => video.id);
        res.json(videoIds);
    } catch (error) {
        console.error('Error fetching playlist:', error);
        res.status(500).json({ error: 'Failed to fetch playlist' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
