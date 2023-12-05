// controllers/children.js
const router = require('express').Router();
const { Child } = require('../../models'); // Update the import to match your controller file

// Handle the creation of a new child
router.post('/api/child', async (req, res) => {
    try {
        console.log('POST /api/child endpoint hit');
        const { child_name, user_id, naughtyNice } = req.body;
        // Perform validation if needed

        // Create a new child
        const newChild = await Child.create({
            child_name,
            user_id,
            naughtyNice,
        });

        res.status(201).json(newChild); // Return the newly created child
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Handle the deletion of a child
router.delete('/api/child/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Perform validation if needed

        // Delete the child by ID
        const deletedChild = await Child.destroy({
            where: { id },
        });

        if (deletedChild) {
            res.status(204).end(); // No content is sent in the response
        } else {
            res.status(404).json({ error: 'Child not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

console.log("Child Routes Registered")

// Add more functions as needed for child-related operations
module.exports = router;
