const mongoose = require('mongoose');

const cities = new mongoose.Schema({
    city_name:{
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
},
    {
        timestamps:true
    }
);

module.exports = mongoose.model('city',cities);