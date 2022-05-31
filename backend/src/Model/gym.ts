import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Gym = new Schema
({
    name :
    {
        type : String
    },
    location :
    {
        type : String
    },
    address :
    {
        type : String
    },
    phone :
    {
        type : Number
    }
});

export default mongoose.model('Gym', Gym, 'gym');