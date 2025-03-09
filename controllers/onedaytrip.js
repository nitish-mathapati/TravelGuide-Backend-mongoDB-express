const express = require('express');
const Places = require('../schemas/locationsSchema');


// Need to fetch all the places under setTime
const setTimeinHours = 4;
const setTime = setTimeinHours * 60;

async function oneDayTravel(req,res){

    try {

        const allPlaces = await Places.find().sort({time:-1});
        console.log(allPlaces);
    
        let filteredPlaces = [];
        let totalTime = 0;
    
        for(const place of allPlaces){
            if((totalTime + place.time) <= (setTime)){
                filteredPlaces.push(place);
                totalTime += place.time;
            }
            else{
                console.log("Filter Places: ",filteredPlaces);
                res.render('onedaytrip',{place:filteredPlaces});
            }
        };

    } catch (error) {
        console.log(error);
    }
};

module.exports = oneDayTravel;