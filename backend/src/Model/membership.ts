import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Membership = new Schema
({
    name :
    {
        type : String
    },
    billing :
    {
        type : String
    },
    duration :
    {
        type : Number
    },
    price :
    {
        type : Number
    },
    discount :
    {
        type : Number
    },
    description :
    {
        type : String
    }
});

export default mongoose.model('Membership', Membership, 'memberships');