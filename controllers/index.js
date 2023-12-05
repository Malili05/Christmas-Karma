// controllers/index.js

const router = require('express').Router();
const apiRoutes = require('./api/apiRoutes');
const homeRoutes = require('./homeRoutes');
const chartRoutes = require('./chartRoutes'); // Include chartRoutes

router.use('/api', apiRoutes);
router.use('/chart', chartRoutes); // Use /chart for chart routes
router.use('/', homeRoutes);

module.exports = router;
