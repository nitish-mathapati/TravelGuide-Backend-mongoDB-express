const mongoose = require('mongoose');

const reviewschema = new mongoose.Schema({

    // Reference a document from another collection.
    city_name: { type:String, ref:'city', required:true },    

    starRating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    reviewer: {
        type: String, // You can store the name of the reviewer or a reference to a user
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

module.exports = mongoose.model('Reviews',reviewschema);