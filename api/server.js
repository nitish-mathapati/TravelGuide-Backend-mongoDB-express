require('../connectiondb');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const city = require('../schemas/cityschema');
const User = require('../schemas/userschema');
const Food = require('../schemas/foodschema');
const { oneDayTravel, twoDayTravel, threeDayTravel } = require('../controllers/dayPlans');
const swaggerUi = require('swagger-ui-express');
const { swaggerDocs } = require('../swagger');
const { addReview, getReview } = require('../controllers/reviewcontroller');
const { addfood, getfood } = require('../controllers/foodcontroller');
const { addPlace, getPlace } = require('../controllers/locationscontroller');
require('../controllers/reviewcontroller');
const fs = require('fs');
const path = require('path');
const { render } = require('ejs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { resourceLimits } = require('worker_threads');
const Person = require('../schemas/Person');
const flash = require('connect-flash');
const session = require('express-session');
const nodemailer = require('nodemailer');
const { sendVerificationEmail, sendSuccessEmail } = require('../controllers/email');
// import { generateVerificationToken } from './controllers/email';
const {generateVerificationToken} = require('../controllers/email');
require('dotenv').config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));

app.use('/city',(req,res,next)=>{
    console.log("This is 2nd Middleware");
    next();
});

// Test server
app.get('/test',function(req,res){
    res.send("Hey hi..! welcome to my city server");
});

// Creating siginip-login-logout
app.get('/',(req,res)=>{
    if(req.cookies.token){
        return res.redirect('/UserPanel');
    }
    res.render('home');
});

// Signup
app.get('/signup',(req,res)=>{
    res.render('signup');
});

const saltCache = {};
app.post('/signup',async(req,res)=>{
    try {

        const { username, email, password, age } = req.body;
        const check = await User.findOne({email});
        if(check){
            return res.status(400).json({"message":"User already exists"})
        } else{
            res.clearCookie("token");
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);

        const token = jwt.sign({email}, "balleballe", { expiresIn: '1h' });
        res.cookie("token",token);
    

        const createdUser = await User.create({
            username,
            email,
            password:hash,
            age
            // verifytoken: token
        });

        const hashverify = await generateVerificationToken(email, "signup");
        console.log("Hashverify: ",hashverify);
        const verifyToken = encodeURIComponent(hashverify);
        console.log("url encoded hash", verifyToken);

        saltCache[email] = salt;
        
        // Sending Email to User
        sendVerificationEmail(email,username,verifyToken);

        // createdUser.token = token;
        // await createdUser.save();

        // res.render('user');
        res.status(200).json({ message: 'Signup successful. Please check your email for verification.' });

        // bcrypt.genSalt(10, (err,salt)=>{
        //     bcrypt.hash(password, salt, async (req,hash)=>{
        //         const createdUser = await User.create({
        //             username,
        //             email,
        //             password:hash,
        //             age
        //         })http://localhost:2025/verify/%242b%2410%247tTsUHc4fIGvNflzTUZlaez7j4XlTq9HQF.sAh.blxGs0CUtHrFM2
        //         const token = jwt.sign({email}, "balleballe");
        //         res.cookie("token", token);

        //         // Sending Email to User
        //         sendWelcomeEmail(email,username);

        //         res.render('panel');
        //     })
        // })

    }catch (error) {
        console.log(error);
    }
});

// Email verification
app.get('/verify/:verifytoken',async(req,res)=>{
    try {
        const verificationToken = req.params.verifytoken;
        console.log("url encoded hash", verificationToken)

        if (!verificationToken) {
            return res.status(400).json({ message: 'No token provided' });
        }

        // const decode = jwt.verify(token.verifytoken, "balleballe");
        // console.log("decode",decode);
        // const user = await User.findOne({email:decode.email});

        const cookieToken = req.cookies.token;
        console.log(cookieToken);
        if (!cookieToken) {
            return res.status(400).json({ message: 'No cookie token found. Please sign up again.' });
        }
        const decode = jwt.verify(cookieToken,"balleballe");

        console.log("decodeEmail: ",decode.email);
         
        const user = await User.findOne({"email":decode.email});

        if(!user){
            res.clearCookie("token")
            return res.status(400).json({message:"user not found"});
        }

        if(user.isVerified){
                return res.status(400).json({message:"User is already verified"});
        }
        
        // const salt = saltCache[decode.email];
        // if (!salt) {
        //     return res.status(400).json({ message: "Salt not found, please try again." });
        // };

        // const genToken = await generateVerificationToken(decode.email,"verification");
        // console.log("regenerated token",genToken);
        const x = decodeURIComponent(verificationToken);
        console.log("url decode hash: ",x);

        // const hashedX = await bcrypt.hash(x,salt);
        // console.log("Hashed-X: ",hashedX);

        // (Boolean)Returns true if they are equal
        // console.log("Comparison:", genToken === x);

        const plainPass = decode.email+'something';

        const isMatch = await bcrypt.compare((plainPass),x);
        console.log("Is match:", isMatch);

        if (isMatch) {
            sendSuccessEmail(user.email,user.username);
            user.isVerified = true;
            // user.verifytoken = undefined;
            await user.save();
            res.redirect('/UserPanel');
        } else {
            return res.status(400).json({message: "you fool"})
        }

        // const x = decodeURIComponent(verificationToken);
        // if(genToken ===  decodeURIComponent(verificationToken)){
        //     sendSuccessEmail(user.email,user.username);
        //     user.isVerified = true;
        //     // user.verifytoken = undefined;
        //     await user.save();
        //     res.render('panel');
        // } else {
        //     res.status(400).json({message: "you fool"})
        // }     
        //$2b$10$u3l1GiPi.i0O87SQqE3Cb.HwMgCHTOSjOaWvBfd/7yfN3X7Grz/X6
        //$2b$10$ucjfNr5NsHIF0skVCTCKpemSL0EZ3AfUZLsbOJ.hTlsPIdW6u5XeW
        //http://localhost:2025/verify/%242b%2410%24vI2r8zWLgUZ%2FZWrgv2D6xOsY.U%2FHcLCrp27ekY50CWsje4wYMS8o6
    } catch (error) {
        console.log("the error is",error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});


// Login
app.get('/login', (req,res)=>{
    res.render('login');
});

app.post('/login',async(req,res)=>{

    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.clearCookie("token"); // Remove the cookie
            return res.status(400).json({ message: 'User has been deleted. Please sign up again.' });
        }

        if(req.cookies.token){
            return res.redirect('/UserPanel');
        }
    
        // To login as admin or user
        const adminName = await User.findOne({email:req.body.email});
        if (adminName.username === "admin") {
            await bcrypt.compare(req.body.password, adminName.password, (err,result)=>{
                if(result){
                    const ADtoken = jwt.sign({email:adminName.email},"admin",{ expiresIn: '10m' });
                    res.cookie("admin",ADtoken);
                    res.redirect('/AdminPanel');
                }
            })
        } else {
            const user = await User.findOne({email: req.body.email});
            if(!user) return res.send("Invalid email or password");
        
            await bcrypt.compare(req.body.password, user.password, (err,result)=>{
                if(result){
                    const token = jwt.sign({email:user.email}, "balleballe",{ expiresIn: '15m' });
                    res.cookie("token", token,);
                    res.redirect('/UserPanel');
                }
                else res.send("Invalid email or password");
            })
        }
    } catch (error) {
        console.log(error);
    }
    
});

// Logout
app.get('/logout', (req,res)=>{
    res.cookie("token", "");
    // res.clearCookie("token");
    res.redirect('/');
});



// APIs
// Panel
app.get('/panel',(req,res)=>{
    res.render('panel');
});

// Admin
app.get('/AdminPanel',(req,res)=>{
    res.render('admin',{message:req.flash()});
});

// City
app.get('/city/addcity', (req,res)=>{
    res.render('addcity');
});

// Food
app.get('/city/addFood', (req,res)=>{
    res.render('addfood');
});

// Places
app.get('/city/addPlace', (req,res)=>{
    res.render('addlocation');
});

// User
app.get('/UserPanel',async(req,res)=>{
    try {
        const cities = await city.find();
        // console.log("citie sare: ",cities);

        if (cities && cities.length > 0) {
            res.render('user', { cities });
        } else {
            res.render('user', { cities: [] });
        }
        // res.render('addfood',{cities});
    } catch (error) {
        console.log(error);
    }
});

// Details
app.get('/citydetails',(req,res)=>{
    res.render('details');
})



// CRUD operation
// Create
app.post('/city/addcity', async function (req,res) {    
    try {
        const data = req.body;
        await city.create(data);
        console.log("Successfully added city to database");
        res.render('admin');
    } catch (error) {
        res.send("Oopss..! Something went wrong")
        return console.error(error);
    }
});

// Add Person
app.post('/person',async(req,res)=>{
    try {
        const { city_name, name, age } = req.body;
        const person = new Person({
            city_name,
            name,
            age
        });

        await person.save();
    } catch (error) {
        console.log(error);
    }
})

// Get Person
app.get('/getPerson/:city_name', async(req,res)=>{
    try {
        const city = req.params.city_name;
        const person = await Person.find({city_name:city}).select('city_name name age -_id');
        console.log("PersonDetails: ",person);
    } catch (error) {
        console.log(error)
    }
});

// Read all
app.get('/city/getcity', async function (req,res) {
    try {
        // const searchQuery = req.query.search || ''; 
        // console.log("Search Query:", searchQuery);
        const data = await city.find().select('city_name state pincode -_id');
        console.log("city details: ",data);
        // return res.json({
        //     data,
        //     message: "All cities details"
        // })
        // res.render('readcity',{data:data});
        // res.render('user', { data });
    } catch (error) {
        return res.send(error);
    }
});

// Read by name
app.get('/city/getcitybyname/:city_name', async function(req,res) {
    try {
        const cityName = req.params.city_name;

        const data = await city.find({city_name:cityName}).select('city_name state pincode -_id');
        if (data.length == 0){
            return res.json({message: "This city is not preset in the database."});
        }
        return res.json({data});

    } catch (error) {
        console.log(error)
        return res.send("Error in fetching the data from database")
    }
});

// Update by name
app.put('/city/updatecitybyname/:city_name',async function (req,res) {
    // const cityName = req.params.city_name;
    // const newcity = req.body.city_name;
    // const newpin = req.body.pincode;
    // console.log(newcity);

    try {
        const { city_name, state, pincode } = req.body;
        // await city.updateOne({city_name:cityName},{$set:{city_name:newcity, pincode:newpin}});
        // const city_name = newcity;

        await city.updateOne(
            {city_name: req.params.city_name},
            {$set:{city_name,state,pincode}},
            { new:true }
        );

        const data = await city.find({city_name:city_name}).select('city_name state pincode -_id');
        return res.json({data:data});

    } catch (error) {
        console.log(error)
        res.send("Error in database to update");
    }
})

// Delete by name
app.delete('/city/deletebyname/:city_name', async function (req,res) {
    const cityName = req.params.city_name;
    try {
        await city.deleteOne({city_name:cityName});
        res.status(200).send("Successfully deleted city from database");
    } catch (error) {
        console.log(error);
        return res.send("Error in database to delete")
    }
})

// Route to add a review
app.post('/city/addReview', addReview);

// Route to get reviews of specific city
app.get('/city/getReview/:city_name', getReview);

// Route to add the food of a particular city
app.get('/city/Food',async(req,res)=>{
    try {
        const cities = await city.find();
        // console.log("cities are: ",cities);

        if (cities && cities.length > 0) {
            res.render('addfood', { cities });
        } else {
            res.render('addfood', { cities: [] });
        }
        // res.render('addfood',{cities});
    } catch (error) {
        console.log(error);
    }
});
app.post('/city/addFood', addfood);

// Route to fetch the food of a particular city
app.get('/city/food/:city_name', getfood);
// app.get('/cityfood/:city_name',async(req,res)=>{
//     const id = req.params.city_name;
//     const food = await Food.find({city_name: id}).select('food description -_id');
//     res.render('foodDetails',{ food });
// })

// Route to add the place of a particular city
app.get('/city/Place',async(req,res)=>{
    try {
        const cities = await city.find();
        // console.log("citiesare: ",cities);
    
        if (cities && cities.length > 0) {
            res.render('addlocation', { cities });
        } else {
            res.render('addlocation', { cities: [] });
        }
    } catch (error) {
        console.log(error);
    }
});
app.post('/city/addPlace', addPlace);

// Route to get the places of a particular city
app.get('/city/place/:city_name', getPlace);
app.get('/cityplaces/:city_name',async(req,res)=>{
    // const id = req.params.city_name;
    // const data = await Places.find({city_name: id}).select('locationName description time -_id');
    // res.render('cityDetails',{ data });
    const cityName = req.params.city_name;
    res.render('details', { city_name:cityName });
});

// Day Plans
// One Day Plan
app.get('/city/onedayplan/:city_name',oneDayTravel);
// app.get('/city/onedayplan/:city_name', async(req,res)=>{
//     try {
//         const data = await oneDayTravel();
//         console.log("The data is: ",data);
//         // console.log(data);  
//         res.render('onedayplan',{ data:data });
//     } catch (error) {
//         console.log(error);
//     }
// });

// Two Days Plan
app.get('/city/twodaysplan/:city_name',twoDayTravel);
// app.get('/city/twodaysplan', async(req,res)=>{
//     try {
//         const data = await twoDayTravel();
//         console.log("The data is: ");
//         console.log(data);
//         res.render('twodaysplan',{ data:data});
//     } catch (error) {
//         console.log(error);
//     }
// });

// Three Days Plan
app.get('/city/threedaysplan/:city_name',threeDayTravel);
// app.get('/city/threedaysplan', async(req,res)=>{
//     try {
//         const data = await threeDayTravel();
//         console.log("The data is: ");
//         console.log(data);
//         res.render('threedaysplan',{ data:data});
//     } catch (error) {
//         console.log(error);
//     }
// });

app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Successfully connected to port: ${PORT}`);
});
