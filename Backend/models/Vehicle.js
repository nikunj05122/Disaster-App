const mongoose = require('mongoose');
const { ORGANIZATION } = require('../constant/types');

const VehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vehicle name name must be.']
    },
    department: {
        type: String,
        enum: [...Object.values(ORGANIZATION)],
        require: [true, 'Please select department for vehicle.']
    }
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;