// homeRoutes.js

const router = require('express').Router();
const { Child } = require('../models');

router.get('/', async (req, res) => {
    res.render('homepage', {});
});

router.get('/login', async (req, res) => {
    res.render('login', {});
});

router.get('/profile', async (req, res) => {
    res.render('profile', {});
});

router.get('/lists', async (req, res) => {
    try {
        const children = await Child.findAll();
        console.log('Fetched children in homeRoutes:', children);
        res.render('lists', { children });
    } catch (err) {
        console.error('Error fetching children data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// The duplicate route for the root path is removed

module.exports = router;
