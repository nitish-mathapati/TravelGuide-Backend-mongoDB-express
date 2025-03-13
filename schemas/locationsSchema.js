const mongoose = require('mongoose');

const locationschema = new mongoose.Schema({

    city_name: { type:String, ref:'city', required:true },

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

});

module.exports = mongoose.model('Places',locationschema);