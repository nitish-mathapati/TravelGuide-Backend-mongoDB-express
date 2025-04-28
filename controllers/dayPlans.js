const express = require('express');
const Places = require('../schemas/locationsSchema');

//One Day Plan
// Need to fetch all the places under setTime
async function oneDayTravel(req,res){
    
    const setTimeinHours = 4;
    const setTime = setTimeinHours * 60;

    try {

        const city = req.params.city_name;
        const allPlaces = await Places.find({city_name:city});
        // console.log(allPlaces);  
    
        let filteredPlaces = [];
        let totalTime = 0;
    
        for(const place of allPlaces){
            if((totalTime + place.time) <= (setTime)){
                filteredPlaces.push(place);
                totalTime += place.time;
            }
            // else{
            //     // return filteredPlaces;
            //     // res.render('onedaytrip',{place:filteredPlaces});
            // }
        }
        // const places = filteredPlaces.sort({time:1});
        const places = filteredPlaces.sort((a, b) => a.time - b.time);
        console.log("One day plan: ",places);
        res.status(200).json({places});
        // res.render('onedayplan',{ data:places });

    } catch (error) {
        console.log(error);
        res.status(400).send('Error occurred while processing 1D plan');
        // alert(`Error: ${error.message}`,'Error occurred while processing 1D plan');
    }
};
// module.exports = oneDayTravel;




// Two Days Plan
async function twoDayTravel(req,res){

    const setTimeinHours = 8;
    const setTime = setTimeinHours * 60;

    try {

        const city = req.params.city_name
        const allPlaces = await Places.find({city_name:city});
        // console.log(allPlaces);
    
        let filteredPlaces = [];
        let totalTime = 0;
    
        for(const place of allPlaces){
            if((totalTime + place.time) <= (setTime)){
                filteredPlaces.push(place);
                totalTime += place.time;
            }
            // else{
            //     // return filteredPlaces;
            //     // res.render('onedaytrip',{place:filteredPlaces});
            // }
        }
        const places = filteredPlaces.sort((a, b) => a.time - b.time);
        console.log("Two days plan: ",places);
        res.status(200).json({places});
        // res.render('onedayplan',{ data:places });

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
        const allPlaces = await Places.find({city_name:city});
        // console.log(allPlaces);
    
        let filteredPlaces = [];
        let totalTime = 0;
    
        for(const place of allPlaces){
            if((totalTime + place.time) <= (setTime)){
                filteredPlaces.push(place);
                totalTime += place.time;
            }
            // else{
            //     // return filteredPlaces;
            //     // res.render('onedaytrip',{place:filteredPlaces});
            // }
        }
        const places = filteredPlaces.sort((a, b) => a.time - b.time);
        console.log("Three days plan ",places);
        res.status(200).json({places});
        // res.render('onedayplan',{ data:places });

    } catch (error) {
        console.log(error);
    }
};
module.exports = {oneDayTravel,twoDayTravel,threeDayTravel};