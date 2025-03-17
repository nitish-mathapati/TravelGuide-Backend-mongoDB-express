const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifytoken: {
        type: String
    }

});

module.exports = mongoose.model("User", userSchema);