const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const childRoutes = require('./childRoutes');

router.use('/', homeRoutes);
router.use('/', childRoutes);

module.exports = router;
