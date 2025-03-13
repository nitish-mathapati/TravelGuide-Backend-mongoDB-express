const Food = require('../schemas/foodschema');
const city = require('../schemas/cityschema');
const mongoose = require('mongoose');

// Add a food items of particular city
exports.addfood = async (req,res) => {
    
    try {
        
        const { city_name, food, description } = req.body;

        const newFood = new Food({
            city_name,
            food,
            description  
        });
        newFood.newDate = newFood.Date.toLocaleString();
        await newFood.save();

        console.log("Successfully added the food")
        res.redirect('/AdminPanel')

    } catch (error) {
        console.log(error);
        res.send("Did not add food details")
    }

};

// Get all food items of particular city
exports.getfood = async (req,res) => {
    try {
        
        const id = req.params.city_name;
        const food = await Food.find({city_name: id}).select('food description -_id');

        res.status(200).json({food});
        console.log("These are the food items of particular city");

    } catch (error) {
        console.log(error);
        res.send("Did not fetch food items",error)
    }
}