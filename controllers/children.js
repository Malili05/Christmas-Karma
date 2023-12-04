// controllers/children.js

const { Children } = require('../models'); // Update the import to match your model filename

// Handle the creation of a new child
exports.createChild = async (req, res) => {
    try {
        const { child_name, last_inital, user_id, naughtyNice } = req.body;
        // Perform validation if needed

        // Create a new child
        const newChild = await Children.create({
            child_name,
            last_inital,
            user_id,
            naughtyNice,
        });

        res.status(201).json(newChild); // Return the newly created child
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Handle the deletion of a child
exports.deleteChild = async (req, res) => {
    try {
        const { id } = req.params;
        // Perform validation if needed

        // Delete the child by ID
        const deletedChild = await Children.destroy({
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
};

// Add more functions as needed for child-related operations
