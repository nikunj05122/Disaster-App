const mongoose = require('mongoose');

const { USER } = require('../constant/types');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    MPIN: {
        type: String,
        required: [true, 'Please Provide the MPIN!']
    },
    location: [
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [Number],
            address: String
        }
    ],
    designation: {
        type: String,
    },
    type: {
        type: String,
        enum: [Object.values(USER)],
        require: [true, 'Provide right user type.']
    },
    number: {
        type: Number,
        require: [true, 'Provide the number.']
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;