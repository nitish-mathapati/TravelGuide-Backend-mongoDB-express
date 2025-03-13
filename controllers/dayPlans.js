const express = require('express');
const Places = require('../schemas/locationsSchema');

//One Day Plan
// Need to fetch all the places under setTime
async function oneDayTravel(req,res){

    const setTimeinHours = 4;
    const setTime = setTimeinHours * 60;

    try {

        const city = req.params.city_name;
        const allPlaces = await Places.find({city_name:city}).sort({time:-1});
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
                res.render('onedayplan',{ data:filteredPlaces });
                // return filteredPlaces;
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

        const city = req.params.city_name
        const allPlaces = await Places.find({city_name:city}).sort({time:-1});
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
                res.render('twodaysplan',{ data:filteredPlaces });
                // return filteredPlaces;
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

        const city = req.params.city_name
        const allPlaces = await Places.find({city_name:city}).sort({time:-1});
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
                res.render('threedaysplan',{ data:filteredPlaces });
                // return filteredPlaces;
                // res.render('onedaytrip',{place:filteredPlaces});
            }
        }

    } catch (error) {
        console.log(error);
    }
};
module.exports = {oneDayTravel,twoDayTravel,threeDayTravel};