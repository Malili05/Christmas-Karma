const router = require('express').Router();
const userRoutes = require('./userRoutes');
const childRoutes = require('./childRoutes');

router.use('/users', userRoutes);
router.use('/children', childRoutes);

module.exports = router;
