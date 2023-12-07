const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const chartRoutes = require('./chartRoutes'); // Include chartRoutes

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/chart', chartRoutes); // Use /chart for chart routes
router.use('/', homeRoutes);

module.exports = router;
