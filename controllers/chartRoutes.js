// controllers/chartRoutes.js
const { Child } = require('../models');
const router = require('express').Router();

// Define your chart routes here

router.get('/', (req, res) => {
  // Render your chart page
  res.render('chart');
});
router.get('/test', async (req, res) => {
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
  if(record.naughtyNice) naughty+= 1
  else nice += 1
})
data.datasets[0].data.push(naughty, nice)
  res.send(data)
});
module.exports = router;
