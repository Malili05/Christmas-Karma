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
        const userId = req.session.user_id;

        const userData = await User.findByPk(userId, {
            include: [{ model: Child, as: 'children' }],
        });

        res.render('profile', {
            layout: 'main',
            name: userData.name,
            children: userData.children, // Use the correct alias 'children'
        });
    } catch (err) {
        console.error('Error rendering profile page:', err);
        res.status(500).json({ error: 'Failed to render profile page' });
    }
});

router.get('/lists', withAuth(false), async (req, res) => {
    try {
        let children;
        const filter = req.query.filter; // Retrieve filter parameter from query string
        const query= {
            attributes: ['child_name', 'naughtyNice', 'country']
        }
        if (filter === 'nice' || filter === 'naughty') {
            query.where= {
                naughtyNice: filter === 'nice' ? 1 : 0
            }
        }
        children = await Child.findAll(query)

        res.render('lists', { children });
    } catch (err) {
        console.error('Error fetching children data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
