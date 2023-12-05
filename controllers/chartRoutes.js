// controllers/chartRoutes.js

const router = require('express').Router();

// Define your chart routes here

// Example route
router.get('/', (req, res) => {
  // Render your chart page
  res.render('chart');
});

module.exports = router;
