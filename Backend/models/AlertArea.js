const mongoose = require('mongoose');

const AlertAreaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Provide the name of the alert area.']
    },
    location: {
        type: String,
        features: [{
            id: String,
            type: String,
            properties: Object,
            geometry: {
                type: String,
                coordinates: Array
            }
        }]
    }
});

const AlertArea = mongoose.model('AlertArea', AlertAreaSchema);

module.exports = AlertArea;