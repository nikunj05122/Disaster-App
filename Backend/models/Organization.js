const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const _ = require('lodash');

const { ORGANIZATION } = require('../constant/types');

const OrganizationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true, // Unique is not a validater.
            trim: true, // remove whitespace in the beginning and end of the string.
        },
        slug: String,
        type: {
            type: String,
            enum: [...Object.values(ORGANIZATION)],
            require: [true, 'Organization must have a type']
        },
        address: {
            type: String,
            require: [true, 'Organization must have a address'],
            trim: true,
        },
        location: {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [Number]
        },
        number: [{
            type: String,
            require: [true, 'Provide the number.'],
            unique: true,
            validate: [validator.isMobilePhone, 'Please provide a valid number.'] // Validate the number.
        }],
        img: String,
        vehicles: [
            {
                name: String,
                count: Number
            }
        ],
        state: {
            type: String,
            require: [true, 'Provide the Organization state.']
        },
        city: {
            type: String,
            require: [true, 'Provide the Organization city.']
        },
        head: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        officers: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

OrganizationSchema.index({ slug: 1 });
OrganizationSchema.index({ location: '2dsphere' });

OrganizationSchema.virtual('totalVehicles').get(function () {

    return _.reduce(this.vehicles, (n, data) => {
        return data.count + n;
    }, 0)
});

//  DOCUMENT MIDDLEWARE : runs before .save() and .create()
// this is called (preSave Hook)
OrganizationSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true }); //this keywork is refer to current document.
    next();
});

OrganizationSchema.pre(/^find/, function (next) {
    this.select("-__v");
    this.populate({
        path: "head officers",
        select: "-__v"
    });
    next();
});

const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;