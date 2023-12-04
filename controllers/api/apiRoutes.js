// controllers/api/apiRoutes.js
const router = require('express').Router();
const userRoutes = require('./userRoutes');  // Adjust the path if needed

router.use('/user', userRoutes);  // Use the correct path

// ... other routes

module.exports = router;
