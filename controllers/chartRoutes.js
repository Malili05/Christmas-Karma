
// controllers/chartRoutes.js

const { Child } = require('../models');
const router = require('express').Router();

// Define your chart routes here
router.get('/', (req, res) => {
  // Render your chart page
  res.render('chart');
});

module.exports = router;