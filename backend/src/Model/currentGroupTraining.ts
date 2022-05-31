import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let CurrentGroupTraining = new Schema
({
    name :
    {
        type : String
    },
    trainer :
    {
        type : String
    },
    duration :
    {
        type : Number
    },
    time :
    {
        type : Number
    },
    maxpeople :
    {
        type : Number
    },
    participants :
    {
        type : Array
    },
    numofpeople :
    {
        type : Number
    },
    day :
    {
        type : String
    }
});

export default mongoose.model('CurrentGroupTraining', CurrentGroupTraining, 'currentGroupTrainings');