const mongoose = require('mongoose');

const AlertAreaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Provide the name of the alert area.']
        },
        location: {
            type: {
                type: String
            },
            features: [{
                id: String,
                type: {
                    type: String
                },
                properties: Object,
                geometry: {
                    type: {
                        type: String
                    },
                    coordinates: Array
                }
            }]
        },
        type: String
    },
    {
        timestamps: true
    }
);

const AlertArea = mongoose.model('AlertArea', AlertAreaSchema);

module.exports = AlertArea;