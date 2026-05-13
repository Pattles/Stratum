const express = require('express');
const router = express.Router();
const Song = require('../db');

router.get('/', async (req, res) => {
    try {
        const { tags } = req.query;
        
        let query = {};
        
        if (tags) {
            const tagsArray = tags.split(',');
            query = { tags: { $all: tagsArray } };
        }
        
        const songs = await Song.find(query);
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;