const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const campgroundSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    images: [
        {
            url: String,
            filename: String
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    geometry: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    }    
}, {toJSON: {virtuals: true}})

campgroundSchema.path('images').schema.virtual('thumbnail').get(function() { 
    return this.url.replace('/upload/', '/upload/w_200/');
});


campgroundSchema.post('findOneAndDelete', async function(campground){
    if(campground){
       await Review.deleteMany({ _id : {$in : campground.reviews}});
    }
})

campgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `<strong><a href="/campgrounds/${this._id}"> ${this.title} </a></strong>
    <p>${this.description.substring(0,30)}...</p>`;
})
module.exports = mongoose.model('Campground', campgroundSchema, );