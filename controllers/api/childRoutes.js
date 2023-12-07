const router = require('express').Router();
const { Child } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route to retrieve all children
router.get('/', withAuth, async (req, res) => {
  try {
    const children = await Child.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(children);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newChild = await Child.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newChild);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const childData = await Child.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!childData) {
      res.status(404).json({ message: 'No Child found with this id!' });
      return;
    }

    res.status(200).json(childData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
