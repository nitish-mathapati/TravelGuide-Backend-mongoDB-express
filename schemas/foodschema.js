const mongoose = require('mongoose');

const foodschema = new mongoose.Schema({

    city_name: { type:String, ref:'city', required:true },

    food: {
        type: String,
        required: true
    },
    description: {
        type: String,
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

module.exports = mongoose.model('Food',foodschema);