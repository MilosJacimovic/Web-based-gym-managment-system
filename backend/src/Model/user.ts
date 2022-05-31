import mongoose from 'mongoose';



const Schema = mongoose.Schema;

let User = new Schema
({
    name :
    {
        type : String
    },
    surname :
    {
        type : String
    },
    username :
    {
        type : String
    },
    mail :
    {
        type : String
    },
    phone :
    {
        type : Number
    },
    city :
    {
        type : String
    },
    type :
    {
        type : String
    },
    description :
    {
        type : String
    },
    listoftrainings :
    {
        type : Array
    },
    trrequest :
    {
        type : String
    },
    personalrequest :
    {
        type : Boolean
    },
    status :
    {
        type : String
    },
    verified :
    {
        type : String
    },
    location :
    {
        type : String
    },
    image :
    {
        type : String
    },
    membership :
    {
        type : String
    },
    dateFrom :
    {
        type : Date
    },
    hash :
    {
        type : String
    },
    salt :
    {
        type : String
    },
    qrcode :
    {
        type : String
    },
    imageBase64 :
    {
        type : String
    }
});



export default mongoose.model('User', User, 'users');