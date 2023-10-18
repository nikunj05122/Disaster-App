const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vehicle name name must be.']
    },
    department: {
        type: String,
        require: [true, 'Please select department for vehicle.']
    }
});

const Vehicle = new mongoose.Model('Vehicle', VehicleSchema);

module.exports = Vehicle;