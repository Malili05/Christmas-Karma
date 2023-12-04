// homeRoutes.js

const router = require('express').Router();
const { User, Child } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('homepage', {});
});

router.get('/login', async (req, res) => {
    res.render('login', {});
});

router.get('/profile', withAuth(true), async (req, res) => {
    try {
        // Assuming you have a session variable storing the user ID
        const userId = req.session.user_id;

        // Fetch the user and their associated children using the correct alias
        const userData = await User.findByPk(userId, {
            include: [{ model: Child, as: 'children' }], // Use the correct alias 'children'
        });

        // Render the profile page with the user data
        res.render('profile', {
            layout: 'main',  // Assuming you have a main layout template
            name: userData.name,
            childs: userData.children, // Use the correct alias 'children'
        });
    } catch (err) {
        console.error('Error rendering profile page:', err);
        res.status(500).json({ error: 'Failed to render profile page' });
    }
});

// Example route displaying the list of children without authentication
router.get('/lists', withAuth(false), async (req, res) => {
    try {
        const children = await Child.findAll({
            attributes: ['child_name', 'naughtyNice'],
        });
        console.log('Fetched children in homeRoutes:', children);
        res.render('lists', { children });
    } catch (err) {
        console.error('Error fetching children data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
