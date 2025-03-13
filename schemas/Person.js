const mongoose = require('mongoose');

const perSchema = new mongoose.Schema({
    city_name: { type: String, ref: 'city', required:true },
    name:{type:String, required:true},
    age:{type:Number, required:true}
})

module.exports = mongoose.model('Person', perSchema);