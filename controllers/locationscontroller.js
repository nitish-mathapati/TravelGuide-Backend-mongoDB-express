const Places = require('../schemas/locationsSchema');
const city = require('../schemas/cityschema');
const mongoose = require('mongoose');

// Add places to visit for particular city
exports.addPlace = async (req,res) => {
    try {
        
        const { city_name, locationName, description, time } = req.body;
        const checkcity = await city.findOne({city_name});

        try {
            if(!checkcity){
                console.log('Add the city first');
                // res.redirect('/AdminPanel');
                return res.status(400).json({message:"Add the city first"});
            }
        } catch (error) {
            console.log(error)
        }

        // Creates new object
        const newPlace = new Places({
            city_name,
            locationName,
            description,
            time,
            newDate: new Date().toLocaleString()
        });
        // newPlace.newDate = newPlace.Date.toLocaleString();
        await newPlace.save();

        console.log("Successfully added the place")
        res.redirect('/AdminPanel');

    } catch (error) {
        res.status(500).send("Did not add place details");
        console.log(error);
    }
};

// Get all places of particular city
exports.getPlace = async (req,res) => {
    try {
        
        const id = req.params.city_name;
        const place = await Places.find({city_name: id}).select('locationName description time -_id');

        res.status(200).send({place});
        console.log("These are the places to visit in this city");

    } catch (error) {
        res.status(500).send("Did not fetch places of city",error);
    }
}