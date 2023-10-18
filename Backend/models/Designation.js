const mongoose = require('mongoose');

const DesignationSchema = new mongoose.Schema({
    department: {
        type: String,
        required: [true, 'Plaese provide department of the designation.']
    },
    designation: {
        type: String,
        required: [true, 'Please provide proper designation.']
    },
    staff: {
        type: String,
        required: [true, 'Please provide staff']
    }
});

const Designation = mongoose.Model('Designation', DesignationSchema);

module.exports = Designation;