import mongoose from 'mongoose';

//Create a Schema
const mySchema = new mongoose.Schema({
    breed: { type: String, required: true},
    name: {type: String, required:true},
    age: {type:Number, required:true},
    color: String,
    size: {type: String, enum :['Small', 'Medium', 'Large']}
});

// console.log (typeof mySchema);
//Create a Model
const Dogs = mongoose.model ('DogsSEB87', mySchema)

//Export the model
export default Dogs