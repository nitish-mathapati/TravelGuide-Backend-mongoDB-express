require('./connectiondb');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const city = require('./schemas/cityschema');
const User = require('./schemas/userschema');
const { oneDayTravel, twoDayTravel, threeDayTravel } = require('./controllers/dayPlans');
const swaggerUi = require('swagger-ui-express');
const { swaggerDocs } = require('./swagger');
const { addReview, getReview } = require('./controllers/reviewcontroller');
const { addfood, getfood } = require('./controllers/foodcontroller');
const { addPlace, getPlace } = require('./controllers/locationscontroller');
require('./controllers/reviewcontroller');
const fs = require('fs');
const path = require('path');
const { render } = require('ejs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { resourceLimits } = require('worker_threads');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    console.log("This is 1st Middleware");
    fs.appendFile('log.txt',
        `\n "Date"=${Date.now()}\t"IP"=${req.ip}\t"Method"=${req.method}\t"API"=${req.path} \t"Params"=${req.params}`,
        (err,data)=>{
            next();
        }
    )
});

app.use('/city',(req,res,next)=>{
    console.log("This is 2nd Middleware");
    next();
});

// Test server
app.get('/test',function(req,res){
    res.send("Hey hi..! welcome to my city server");
});

// Creating siginip-login-logout
app.get('/', (req,res)=>{
    res.render('home');
});

// Signup
app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.post('/signup',(req,res)=>{
    
    try {
        const { username, email, password, age } = req.body;

        // Hashing the password
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(password, salt, async (req,hash)=>{
                const createdUser = await User.create({
                    username,
                    email,
                    password:hash,
                    age
                })
                const token = jwt.sign({email}, "balleballe");
                res.cookie("token", token);

                res.redirect('/login');
            })
        })
    } catch (error) {
        console.log(error);
    }
});

// Login
app.get('/login', (req,res)=>{
    res.render('login');
});

app.post('/login',async(req,res)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.send("Something went wrong");

    bcrypt.compare(req.body.password, user.password, (err,result)=>{
        if(result){
            const token = jwt.sign({email:user.email}, "balleballe");
            res.cookie("token", token);
            res.render('panel');
        }
        else res.send("Something went wrong");
    })
});

// Logout
app.get('/logout', (req,res)=>{
    res.cookie("token", "");
    res.redirect('/');
});

app.get('/city', (req,res)=>{
    res.render('addcity');
});

// CRUD operation
// Create
app.post('/city/addcity', async function (req,res) {    
    try {
        const data = req.body;
        await city.create(data);
        console.log("Successfully added city to database");
        res.render('addfood');
    } catch (error) {
        res.send("Oopss..! Something went wrong")
        return res.send(error);
    }
});

// Read all
app.get('/city/getcity', async function (req,res) {
    try {
        const data = await city.find().select('city_name state pincode -_id');
        // return res.json({
        //     data,
        //     message: "All cities details"
        // })
        res.render('readcity',{data:data});
    } catch (error) {
        return res.send(error);
    }
});

// One Day Plan
app.get('/city/onedayplan', async(req,res)=>{
    try {
        const data = await oneDayTravel();
        console.log("The data is: ");
        console.log(data);  
        res.render('onedayplan',{ data:data});
    } catch (error) {
        console.log(error);
    }
});

// Two Days Plan
app.get('/city/twodaysplan', async(req,res)=>{
    try {
        const data = await twoDayTravel();
        console.log("The data is: ");
        console.log(data);
        res.render('twodaysplan',{ data:data});
    } catch (error) {
        console.log(error);
    }
});

// Three Days Plan
app.get('/city/threedaysplan', async(req,res)=>{
    try {
        const data = await threeDayTravel();
        console.log("The data is: ");
        console.log(data);
        res.render('threedaysplan',{ data:data});
    } catch (error) {
        console.log(error);
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
app.get('/city/getReview/:cityId', getReview);

// Route to add the food of a particular city
app.post('/city/addFood', addfood);

// Route to fetch the food of a particular city
app.get('/city/food/:cityId', getfood);

// Route to add the place of a particular city
app.post('/city/addPlace', addPlace);

// Route to get the places of a particular city
app.get('/city/place/:cityId', getPlace);

app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(2025,()=>{
    console.log("Successfully connected to port: 2025");
});
