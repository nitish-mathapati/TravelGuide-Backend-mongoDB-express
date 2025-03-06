const Food = require('../schemas/foodschema');
const city = require('../schemas/cityschema');
const mongoose = require('mongoose');

// Add a food items of particular city
exports.addfood = async (req,res) => {
    
    try {
        
        const { cityId, food, description } = req.body;

        const newFood = new Food({
            cityId,
            food,
            description  
        });
        newFood.newDate = newFood.Date.toLocaleString();
        await newFood.save();

        res.send("Successfully added the food")

    } catch (error) {
        res.status(500).send("Did not add food details",error)
    }

};

// Get all food items of particular city
exports.getfood = async (req,res) => {
    try {
        
        const id = req.params.cityId;
        const food = await Food.find({cityId: id});

        res.status(200).json({food});
        console.log("These are the food items of particular city");

    } catch (error) {
        res.status(500).send("Did not fetch food items",error)
        // console.log(error);
    }
}