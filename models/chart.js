const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
    labels: {
        type: [String],
        required: true,
    },
    values: {
        type: [Number],
        required: true,
    },
    backgroundColor: {
        type: [String],
        required: true,
    },
    // You can add other fields as needed for your data model
});

const ChartData = mongoose.model('ChartData', chartDataSchema);

module.exports = ChartData;
