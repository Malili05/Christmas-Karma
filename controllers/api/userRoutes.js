const router = require('express').Router();
const { User } = require('../../models');

// Route to handle user signup
router.post('/', async (req, res) => {
    try {
        console.log('Received signup request:', req.body);

        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(400).json(err);
    }
});

// Route to handle user login
router.post('/login', async (req, res) => {
    try {
        console.log('Login request received:', req.body);

        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.error('Error in login route:', err);
        res.status(400).json(err);
    }
});

// Route to handle user logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Route to check user login status
router.get('/', (req, res) => {
    try {
        console.log('Received logout request');
        if (req.session.logged_in) {
            res.status(200).json({ loggedIn: true, user: { /* include user data */ } });
        } else {
            res.status(200).json({ loggedIn: false });
        }
    } catch (err) {
        console.error('Error during login status check:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
