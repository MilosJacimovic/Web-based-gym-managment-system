export class User
{
    name : string;
    surname : string;
    username : string;
    password : string;
    mail : string;
    phone : number;
    city : string;
    type : string;
    description : string;
    listoftrainings : Array<Object>;
    trrequest : string;
    personalrequest : boolean;
    status : number;
    verified : number;
    location : string;
    image : string;
    membership : string;
    dateFrom : Date;
    salt : string;
    hash : string;
    qrcode : string;
}