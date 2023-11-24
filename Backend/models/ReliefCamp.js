const mongoose = require('mongoose');
const { RELIEFCAMP } = require('../constant/types');


const ReliefCampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        name: String
    },
    alert: {
        type: mongoose.Schema.ObjectId,
        ref: 'AlertArea'
    },
    type: {
        type: String,
        enum: [...Object.values(RELIEFCAMP)],
        required: [true, 'Please tell us type!']
    },
    active: {
        type: Boolean,
        default: false,
        select: false
    },
    head: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    document: {
        URL: String,
        type: {
            type: String
        }
    }
});

const ReliefCamp = mongoose.model('ReliefCamp', ReliefCampSchema);

module.exports = ReliefCamp;