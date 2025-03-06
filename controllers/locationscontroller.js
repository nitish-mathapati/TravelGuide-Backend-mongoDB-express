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

        res.send("Successfully added the place");

    } catch (error) {
        res.status(500).send("Did not add place details");
        console.log(error);
    }
};