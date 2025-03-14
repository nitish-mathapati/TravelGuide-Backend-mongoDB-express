const city = require('../schemas/cityschema');
const Reviews = require('../schemas/reviewschema');
// import { ObjectId } = require()
const mongoose = require('mongoose');

// Add a new Review
exports.addReview = async (req,res) => {
    
    try {
        //const id = mongoose.Types.ObjectId(cityId); 
        const { city_name, starRating, review, reviewer } = req.body;
        const checkcity = await city.findOne({city_name});

        try {
            if(!checkcity){
                console.log("Add the city first");
                return res.status(400).json({message:"Add the city first"});
            }
        } catch (error) {
            console.log(error);
            return res.status(404).json({message:"Add the city first"});
        }

        // Create a new Review
        const newReview = new Reviews({
            city_name,
            starRating,
            review,
            reviewer,
            newDate: new Date().toLocaleString()
        });
        // newReview.newDate = newReview.Date.toLocaleString()
        await newReview.save();

        res.redirect("/");
        console.log("Review added successfully. Thankyou :) for your valuable time 😁")

    } catch (error) {
        console.log(error)
        res.send("Review did not added 😕😔. Try again....!!");
    }
};

// Calculate and Update the avg rating for a city
// async function updateAvgRating(cityId) {
//     const reviews = await Reviews.find({cityId});
//     const totalReviews = reviews.length;

//     if (totalReviews === 0) {
//         // Handle case where there are no reviews
//         await City.findByIdAndUpdate(cityId, { avgRating: 0 });
//         return;
//     }

//     const totalStars = reviews.reduce((sum,review) => sum + review.starRating, 0);

//     const avgRating = totalStars / totalReviews;

//     await City.findByIdAndUpdate(cityId, {avgRating});

// }

// Get reviews for a city
exports.getReview = async (req,res) => {
    try {
        const id = req.params.city_name;
        const reviews = await Reviews.find({city_name: id}).select('starRating review reviewer -_id');

        res.status(200).json({reviews});
        console.log("It is fetched review \nPlease give some time to add your review 📚📃")


    } catch (error) {
        console.log(error)
        res.send("Couldnot fetch the review 😕😔. Try again....!!");
    }
}