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


// Route to display the naughty/nice list
router.get('/lists', async (req, res) => {
    try {
        // Fetch children data from the database
        const children = await Child.findAll();

        console.log('Fetched children in homeRoutes:', children);

        // Render the lists.handlebars file with the fetched data
        res.render('lists', { children });
    } catch (err) {
        console.error('Error fetching children data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;