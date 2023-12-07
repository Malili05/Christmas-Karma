const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const chartRoutes = require('./chartRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/chart', chartRoutes);
module.exports = router;
