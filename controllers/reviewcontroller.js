const city = require('../schemas/cityschema');
const Reviews = require('../schemas/reviewschema');
// import { ObjectId } = require()
const mongoose = require('mongoose');

// Add a new Review
exports.addReview = async (req,res) => {
    
    try {
        const { cityId, starRating, review, reviewer } = req.body;

        //const id = mongoose.Types.ObjectId(cityId); 
        
        // Create a new Review
        const newReview = new Reviews({
            cityId,
            starRating,
            review,
            reviewer
        });
        newReview.newDate = newReview.Date.toLocaleString()
        console.log(newReview)
        await newReview.save();

        // Update the city's average rating
        // await updateAvgRating(cityId);

        res.send("Review added successfully. Thankyou :) for your valuable time 😁")

    } catch (error) {
        res.status(500).send("Review did not added 😕😔. Try again....!!",error);
        // console.log(error)
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
        const id = req.params.cityId;
        const reviews = await Reviews.find({cityId: id});

        res.status(200).json({reviews});
        console.log("It is fetched review \nPlease give some time to add your review 📚📃")


    } catch (error) {
        // console.log(error)
        res.status(500).send("Couldnot fetch the review 😕😔. Try again....!!",error);
    }
}