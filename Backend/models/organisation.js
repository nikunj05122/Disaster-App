const mongoose = require('mongoose');

const { ORGANIZATION } = require('../constant/types');

const OrganisationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [Object.values(ORGANIZATION)],
        require: [true, 'Organisation must have a type']
    },
    address: {
        type: String,
        require: [true, 'Organisation must have a address']
    },
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        require: [true, 'Organisation must have a location']
    },
    phone: [{
        type: Number,
        require: [true, 'Organisation must have a phone number']
    }],
    img: String,
    vehicles: [
        {
            type: String,
            count: Number
        }
    ],
    state: {
        type: String,
        require: [true, 'Provide the organisation state.']
    },
    city: {
        type: String,
        require: [true, 'Provide the organisation city.']
    }
});

const Organisation = mongoose.model('Organisation', OrganisationSchema);

module.exports = Organisation;