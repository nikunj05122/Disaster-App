const mongoose = require('mongoose');

const AlertAreaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Provide the name of the alert area.']
    },
    location: {
        type: {
            type: String,
            enum: ['Polygon', 'MultiPolygon']
        },
        coordinates: { type: Array },
        required: [true, 'Organisation must have a location']
    }
});

const AlertArea = mongoose.model('AlertArea', AlertAreaSchema);

module.exports = AlertArea;