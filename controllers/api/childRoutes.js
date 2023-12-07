const router = require('express').Router();
const { Child } = require('../../models');
const apiAuth = require('../../utils/apiAuth');

// GET route to retrieve all children
router.get('/', apiAuth, async (req, res) => {
  try {
    console.log('GET /children route reached');
    const children = await Child.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(children);
  } catch (err) {
    console.error('Error in GET /children:', err);
    res.status(500).json(err);
  }
});

// POST route to create a new child
router.post('/', apiAuth, async (req, res) => {
  console.log('POST /children route reached');
  try {
    console.log('POST /children route reached');
    console.log('Request Body:', req.body);

    const newChild = await Child.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log('New Child:', newChild);
    res.status(200).json(newChild);
  } catch (err) {
    console.error('Error in POST /children:', err);
    res.status(400).json(err);
  }
});

// DELETE route to delete a child by ID
router.delete('/:id', apiAuth, async (req, res) => {
  try {
    console.log(`DELETE /children/${req.params.id} route reached`);
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

    console.log('Deleted Child Data:', childData);
    res.status(200).json(childData);
  } catch (err) {
    console.error('Error in DELETE /children/:id:', err);
    res.status(500).json(err);
  }
});

router.get('/chartData', async (req, res) => {
  var data = {
    labels: ['Nice', 'Naughty'],
    datasets: [{
        data: [], // Example data, replace with your actual data
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
    }],
};
const db_data= await Child.findAll({})
let naughty= 0, nice= 0;
db_data.forEach(record => {
  if(record.childNiceness) naughty+= 1
  else nice += 1
})
data.datasets[0].data.push(naughty, nice)
  res.send(data)
});

module.exports = router;
