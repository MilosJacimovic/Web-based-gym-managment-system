import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Training = new Schema
({
    name :
    {
        type : String
    },
    description :
    {
        type : String
    },
    duration :
    {
        type : Number
    },
    intensity :
    {
        type : String
    },
    image :
    {
        type : String
    }
});

export default mongoose.model('Training', Training, 'training');