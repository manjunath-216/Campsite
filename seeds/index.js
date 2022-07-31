const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(() => {
    console.log('Database Connected');
})
.catch((err) => {
    console.log(err);
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const rand = Math.floor(Math.random()*cities.length);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            price: Math.floor(Math.random()*20) + 10,
            location: cities[rand].city + ', ' + cities[rand].admin_name,
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(cities[rand].lng), parseFloat(cities[rand].lat)]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/manjunath216/image/upload/v1658875239/YelpCamp/image3_qaukuk.jpg',
                    filename: 'image3_qaukuk'
                },
                {
                    url: 'https://res.cloudinary.com/manjunath216/image/upload/v1658875240/YelpCamp/image4_f9bauy.jpg',
                    filename: 'image4_f9bauy'   
                }
            ],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat ab quasi eveniet quo at eos repellat modi temporibus voluptatum.',
            author: '62e0061a6ca8d6985c77356e',
        })
        await camp.save();
    }
}

seedDB()
.then(() => {
    mongoose.connection.close()
})