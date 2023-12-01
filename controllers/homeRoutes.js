const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('homepage', {});
});
router.get('/login', async (req, res) => {
    res.render('login', {});
});
router.get('/profile', async (req, res) => {
    res.render('profile', {});
});


module.exports = router;