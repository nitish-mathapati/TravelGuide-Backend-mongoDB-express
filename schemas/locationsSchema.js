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
        type: Number,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    newDate: {
        type: String
    }

})

module.exports = mongoose.model('Places',locationschema);