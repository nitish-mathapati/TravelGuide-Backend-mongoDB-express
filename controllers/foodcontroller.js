const Food = require('../schemas/foodschema');
const city = require('../schemas/cityschema');
const mongoose = require('mongoose');

// Add a food items of particular city
exports.addfood = async (req,res) => {
    
    try {
        
        const { city_name, food, description } = req.body;
        const checkcity = await city.findOne({city_name});

        try {
            if (!checkcity) {
                console.log("Add the city first");
                // res.status(400).json({message:"Add the city first"});
                req.flash('error','Add the city first');
                return res.redirect('/AdminPanel');
            }
        } catch (error) {
            console.log(error);
        }
        
        const newFood = new Food({
            city_name,
            food,
            description,
            newDate: new Date().toLocaleString()
        });
        // newFood.newDate = newFood.Date.toLocaleString();
        await newFood.save();

        console.log("Successfully added the food")
        res.redirect('/AdminPanel')
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Did not add food details"});
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