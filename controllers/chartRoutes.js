// Assuming you're using Express for your server
const express = require('express');
const router = express.Router();

// Import your database model or connection
const ChartData = require('./models/chartData'); // Replace with your actual model or database connection code

router.get('/chartData', async (req, res) => {
    try {
        const data = await ChartData.find(); // Replace with your actual database query
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
