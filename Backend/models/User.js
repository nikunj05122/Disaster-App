const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { USER } = require('../constant/types');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    MPIN: {
        type: String,
        required: [true, 'Please Provide the MPIN!'],
        // minlength: 4,
        // maxlength: 4,
        select: false
    },
    MPINConfirm: {
        type: String,
        require: [true, 'Please confirm your MPIN.'],
        validate: {
            //  This only works on CREATE and SAVE!!!
            validator: function (el) {
                return el === this.MPIN;
            },
            message: 'MPIN are not the same!'
        }
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
    role: {
        type: String,
        enum: [...Object.values(USER)],
        require: [true, 'Provide right user role.'],
        default: USER.USER
    },
    number: {
        type: String,
        require: [true, 'Provide the number.'],
        unique: true,
        validate: [validator.isMobilePhone, 'Please provide a valid number.'] // Validate the number.
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    fcm_token: String,
    web_token: String
});

UserSchema.pre('save', async function (next) {
    // Only run this function if MPIN was actually not modified.
    if (!this.isModified('MPIN')) return next();

    // Hash the MPIN with cost of 12
    this.MPIN = await bcrypt.hash(this.MPIN, 12);

    // Delete MPINConfirm field
    this.MPINConfirm = undefined;
    next();
});


UserSchema.methods.correctMPIN = async function (candidateMPIN, userMPIN) {
    return await bcrypt.compare(candidateMPIN, userMPIN);
};

UserSchema.methods.MPINChangedAfter = function (JWTTimestamp) {
    if (this.MPINChangedAt) {
        // parseInt(Date String, base(10)) <- use for typeCasting
        const changedTimestamp = parseInt(this.MPINChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    return false;
}



const User = mongoose.model('User', UserSchema);

module.exports = User;