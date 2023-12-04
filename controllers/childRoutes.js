const router = require('express').Router();
const { Child } = require('../models');

// Route to display the naughty/nice list
router.get('/lists', async (req, res) => {
    try {
        console.log('Inside the /lists route');
        // Fetch children data from the database
        const children = await Child.findAll();

        // Render the lists.handlebars file with the fetched data
        res.render('lists', { children });
    } catch (err) {
        console.error('Error fetching children data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;