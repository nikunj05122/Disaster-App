const mongoose = require('mongoose');

const OperationSchema = new mongoose.OperationSchema({
    description: {
        type: String,
        required: [true, 'Please provide the description.']
    },
    title: {
        type: String,
        required: [true, 'Please provide the title of operation.']
    },
    date: {
        type: Date,
        required: [true, 'Please provide the date of the operation.']
    },
    facts: [{
        type: String,
    }]
})