const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
    number: {
        type: String,
        required: [true, "Please provide the vehicle number."]
    },
    driverPhoto: {
        type: STring,
        required: [true, "Please provide upload the photo."]
    },
    type: {
        type: String
    }
});

const Ambulance = mongoose.model('Ambulance', AmbulanceSchema);

module.exports = Ambulance;