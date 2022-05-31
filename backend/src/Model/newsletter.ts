import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let NewsLetter = new Schema
({
    mail :
    {
        type : String
    }
});

export default mongoose.model('NewsLetter', NewsLetter, 'newslttr');