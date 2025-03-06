const mongoose = require('mongoose');

const locationschema = new mongoose.Schema({

    cityId: { type: mongoose.Schema.Types.ObjectId },

    locationName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    newDate: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Places',locationschema);