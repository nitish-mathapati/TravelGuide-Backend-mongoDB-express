const express = require('express');
const Places = require('../schemas/locationsSchema');

//One Day Plan
// Need to fetch all the places under setTime
async function oneDayTravel(req,res){

    const setTimeinHours = 4;
    const setTime = setTimeinHours * 60;

    try {

        const allPlaces = await Places.find().sort({time:-1});
        // console.log(allPlaces);
    
        let filteredPlaces = [];
        let totalTime = 0;
    
        for(const place of allPlaces){
            if((totalTime + place.time) <= (setTime)){
                filteredPlaces.push(place);
                totalTime += place.time;
            }
            else{
                console.log("Filter Places: ",filteredPlaces);
                return filteredPlaces;
                // res.render('onedaytrip',{place:filteredPlaces});
            }
        }

    } catch (error) {
        console.log(error);
    }
};
// module.exports = oneDayTravel;




// Two Days Plan
async function twoDayTravel(req,res){

    const setTimeinHours = 8;
    const setTime = setTimeinHours * 60;

    try {

        const allPlaces = await Places.find().sort({time:-1});
        // console.log(allPlaces);
    
        let filteredPlaces = [];
        let totalTime = 0;
    
        for(const place of allPlaces){
            if((totalTime + place.time) <= (setTime)){
                filteredPlaces.push(place);
                totalTime += place.time;
            }
            else{
                console.log("Filter Places: ",filteredPlaces);
                return filteredPlaces;
                // res.render('onedaytrip',{place:filteredPlaces});
            }
        }

    } catch (error) {
        console.log(error);
    }
};
// module.exports = twoDayTravel;




//Three Days Plan
async function threeDayTravel(req,res){

    const setTimeinHours = 12;
    const setTime = setTimeinHours * 60;

    try {

        const allPlaces = await Places.find().sort({time:-1});
        // console.log(allPlaces);
    
        let filteredPlaces = [];
        let totalTime = 0;
    
        for(const place of allPlaces){
            if((totalTime + place.time) <= (setTime)){
                filteredPlaces.push(place);
                totalTime += place.time;
            }
            else{
                console.log("Filter Places: ",filteredPlaces);
                return filteredPlaces;
                // res.render('onedaytrip',{place:filteredPlaces});
            }
        }

    } catch (error) {
        console.log(error);
    }
};
module.exports = {oneDayTravel,twoDayTravel,threeDayTravel};