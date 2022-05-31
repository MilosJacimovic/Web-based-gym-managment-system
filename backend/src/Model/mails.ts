import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Mails = new Schema
({
    from :
    {
        type : String
    },
    firstname :
    {
        type : String
    },
    lastname :
    {
        type : String
    },
    subject :
    {
        type : String
    },
    message :
    {
        type : String
    }
});

export default mongoose.model('Mails', Mails, 'mails');