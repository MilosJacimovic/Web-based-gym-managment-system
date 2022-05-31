import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PersonalRequest = new Schema
({
    trainer :
    {
        type : String
    },
    attendee :
    {
        type : String
    },
    name :
    {
        type : String
    },
    surname :
    {
        type : String
    },
    numperweek :
    {
        type : Number
    },
    description :
    {
        type : String
    },
    status :
    {
        type : Number
    },
    phone :
    {
        type : Number
    },
    trainerName :
    {
        type : String
    }
});

export default mongoose.model('PersonalRequest', PersonalRequest, 'personal_requests');