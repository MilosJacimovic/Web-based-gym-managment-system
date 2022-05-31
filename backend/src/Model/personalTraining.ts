import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PersonalTraining = new Schema
({
    name :
    {
        type : String
    },
    surname :
    {
        type : String
    },
    attendee :
    {
        type : String
    },
    trainer :
    {
        type : String
    },
    trainerName :
    {
        type : String
    },
    numperweek :
    {
        type : Number
    },
    originalPerWeek :
    {
        type : Number
    },
    status :
    {
        type : String
    },
    phone :
    {
        type : Number
    }
});

export default mongoose.model('PersonalTraining', PersonalTraining, 'personal');