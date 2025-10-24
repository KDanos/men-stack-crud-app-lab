import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';

import Dogs from './models/dogs.js'



//Create the application
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded())
app.use(express.static('public'));


//Routes
//Allow access to the landing page
app.get('/', (req, res) => {
    res.render('index.ejs');
})

//Render the form to create a new dog
app.get('/dogs/new', (req, res) => {
    res.render('dogs/new.ejs');
})

//Push the newly created dog to the database
app.post('/dogs', async (req, res) => {
    await Dogs.create(req.body)
    res.redirect('dogs/index');
})

//Make a list of all the dogs
app.get('/dogs/index', async (req, res) => {
    const allDogs = await Dogs.find()
    res.render('dogs/index.ejs', { allDogs })
})

//Make a page to view a single dog with all its attributes
app.get('/dogs/:dogId', async (req, res) => {
    const myDog = await Dogs.findById(req.params.dogId)
    console.log(myDog)
    res.render('dogs/show.ejs', {myDog})
})


//Connections
const myLink = process.env.MONGOOSEDB_URI

const connectionKD = async () => {

    try {
        console.log('I am about to try and connect to the database')
        await mongoose.connect(myLink);
        console.log('I have successfully conntected to the database')
    } catch (error) {
        console.log('I have failed to connect to the database')
    }
}

connectionKD();
console.log('This is just a random message to test asynchronous behaviour')
app.listen(3500, () => { console.log('I am listening') })
