const Places = require('../schemas/locationsSchema');
const city = require('../schemas/cityschema');
const mongoose = require('mongoose');

// Add places to visit for particular city
exports.addPlace = async (req,res) => {
    try {
        
        const { cityId, locationName, description, time } = req.body;

        // Creates new object
        const newPlace = new Places({
            cityId,
            locationName,
            description,
            time
        });
        newPlace.newDate = newPlace.Date.toLocaleString();
        await newPlace.save();

        res.render("addreview");
        console.log("Successfully added the place")

    } catch (error) {
        res.status(500).send("Did not add place details");
        console.log(error);
    }
};

// Get all places of particular city
exports.getPlace = async (req,res) => {
    try {
        
        const id = req.params.cityId;
        const place = await Places.find({cityId: id}).select('locationName description time -_id');

        res.status(200).send({place});
        console.log("These are the places to visit in this city");

    } catch (error) {
        res.status(500).send("Did not fetch places of city",error);
    }
}