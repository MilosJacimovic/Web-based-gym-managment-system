import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import getRawBody from 'raw-body';
import mongoose, { connection, Query } from 'mongoose';
import user from './Model/user';
import membership from './Model/membership';
import training from './Model/training';
import upload from './multer';
import fs from 'fs';
import mails from './Model/mails';
import newsletter from './Model/newsletter';
import e from 'express';
import gym from './Model/gym';
import personalRequest from './Model/personalRequest';
import personalTraining from './Model/personalTraining';
import CurrentGroupTraining from './Model/currentGroupTraining';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/teretana');

const conn = mongoose.connection;
conn.once('open', ()=>{
    console.log('Mongo open');
})


var crypto = require('crypto'); 

const router = express.Router();

const nodemailer = require('nodemailer');

const passwordRegexp = require("password-regexp");

const jwt = require('jsonwebtoken');

const nodeCron = require("node-cron");

const qr = require("qrcode");


app.post("/scan", (req, res) => {
    console.log("Making QR code")
    const url = req.body.url;

    // If the input is null return "Empty Data" error
    if (url.length === 0) 
    {
        console.log("4")
        res.send("Empty Data!");
    }
    
    // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
    // It shall be returned as a png image format
    // In case of an error, it will save the error inside the "err" variable and display it
    
    qr.toDataURL(url, (err: any, src: any) => {
        if (err) 
        {
            console.log("5")
            res.send("Error occured");
        }
      
        // Let us return the QR code image as our response and set it to be the source used in the webpage
        console.log("Made QR code")
        res.json(src);
        //res.render("scan", { src });
    });
});



router.route('/probaBase64').post((req, res)=>
{
})


const job = nodeCron.schedule("00 00 08 * * *", function CheckMemberships() {
    
    user.find({"membership" : "valid", "status" : "1", "verified" : "1"}, (err, UserCheck)=>
    {
        if(err) console.log(err)
        else
        {
            console.log("Checking for expired memberships.")
            UserCheck.forEach(userElem => {

                let Datum = userElem.get("dateFrom");
                let uname = userElem.get("username")
                
                let danas = new Date();
    
                let day = danas.getDay();
                let month = danas.getMonth() + 1;
                let year =  danas.getFullYear();
    
        
                let dayFrom = Datum.getDay();
                let mnthFrom = Datum.getMonth() + 1;
                let yrFrom = Datum.getFullYear();
        
                if(year > yrFrom)
                {
                  if(year - yrFrom > 1)
                  {
                    user.updateOne({"username" : uname}, {$set : {"membership" : "expired"}}, (err)=>
                    {
                        if(err) console.log(err)
                        else
                        {
                            console.log("Users " + uname + " membership expired!");
                        }
                    })
                  }
                  else
                  {
                    if(mnthFrom == 12)
                    {
                      if(day > dayFrom)
                      {
                        user.updateOne({"username" : uname}, {$set : {"membership" : "expired"}}, (err)=>
                    {
                        if(err) console.log(err)
                        else
                        {
                            console.log("Users " + uname + " membership expired!");
                        }
                    })
                      }
                    }
                    else
                    {
                        user.updateOne({"username" : uname}, {$set : {"membership" : "expired"}}, (err)=>
                        {
                            if(err) console.log(err)
                        else
                        {
                            console.log("Users " + uname + " membership expired!");
                        }
                        })
                    }
                  }
                }
                else
                {
                  if(month - mnthFrom > 1)
                  {
                    user.updateOne({"username" : uname}, {$set : {"membership" : "expired"}}, (err)=>
                    {
                        if(err) console.log(err)
                        else
                        {
                            console.log("Users " + uname + " membership expired!");
                        }
                    })
                  }
                  else
                  {
                    if(month - mnthFrom == 1)
                    {
                      if(day > dayFrom)
                      {
                        user.updateOne({"username" : uname}, {$set : {"membership" : "expired"}}, (err)=>
                        {
                            if(err) console.log(err)
                        else
                        {
                            console.log("Users " + uname + " membership expired!");
                        }
                        })
                      }
                    }
                  }
                }
            });
        }
    })
  });

const customRegexp = passwordRegexp({
    min: 8,
    max: 12,
    numeric: true,
    uppercase: true,
    symbols: false, // an option for symbols: ! @ # $ % ^ &
  });


router.route('/verify').post((req, res)=>
{
    let token = req.body.id;
    console.log("Token je: " + token);
    if (token) {
        try {
            jwt.verify(token, 'JWT_SECRET', (e: any, decoded: { id: any; }) => {
                if (e) {
                    //console.log(e)
                    console.log("Token expired")
                    res.status(200).json({"verify" : "no"})
                } else {
                    let id = decoded.id;

                    console.log("id je: " + id);

                    user.findOne({"username" : id}, (err, alreadyVer)=>
                    {
                        if(err) console.log(err);
                        else
                        {
                            let check = alreadyVer.get("verified");
                            if(check == "1")
                            {
                                console.log('Already verified!');
                                res.status(200).json({"verify" : "no"})
                            }
                            else
                            {
                                    user.updateOne({"username" : id}, {$set : {"verified" : '1'}}, (err, ok)=>
                                    {
                                        if(err) console.log(err);
                                        else
                                        {
                                            console.log("Updated status");
                                            res.status(200).json({"verify" : "ok"})
                                        }
                                    })
                                
                            }
                        }
                    })

                
                   
                }

            });
        } catch (err) {
            //console.log("gr2")
            console.log(err)
            res.status(200).json({"verify" : "no"})
        }
    } else {
        console.log("Token is not valid")
        res.status(200).json({"verify" : "no"})

    }

})

router.route('/SendUsMail').post((req, res)=>
{
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: "2c2601bb653e23",
            pass: "79ef238b86e0d4"
        }
    })
 
 
    let message = {
        from: "milos.jacimovic@hotmail.com",
        to: "milos.jacimovic997@gmail.com",
        subject: "Subject",
        text: "Hello SMTP Email"
    }

    message.from = req.body.mail;
    message.subject = req.body.reason;
    message.text = req.body.message;

    transporter.sendMail(message, function(err: any,info: any){
    if (err) {
        console.log(err)
    } 
    else 
    {

        const mailData =
        {
            from : req.body.mail,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            subject : req.body.reason,
            message : req.body.message
        }
        let newMail = new mails(mailData);
        newMail.save().then(newMail =>
            {
                console.log('New mail added');
                res.status(200).json({'mail' : 'ok'});
             }).catch(err =>
                {
                      console.log('error');
                      res.status(400).json({'mail' : 'error'});
                });
    }
    })

   
 
})

app.use('/static', express.static('photos'))

const middleware = upload.array('avatar', 1);

router.use('/photo', middleware);
router.route('/photo').post((req, res) =>
{
    let path = process.cwd();
    let photo = fs.readdirSync(`${path}/photos/`+req.body.username);
    
    let nm = req.body.username;
   
    user.findOne({"username" : nm}, (err, exists)=>
    {
        if(err) console.log(err);
        else if(exists == null)
        {
            
            const updatedPicture = async() =>
            {
                await training.updateOne({"name" : req.body.username}, {$set : {"image" : photo}});
                console.log("Training picture updated");
            }
    
            updatedPicture().then(
                ok => {res.status(200).json({'user' : 'ok'})}
            ).catch(
                err => { res.status(400).json({'user' : 'no'})}
            )
        }
        else
        {

            const updatedPicture = async() =>
            {
                await user.updateOne({"username" : req.body.username}, {$set : {"image" : photo}});
                console.log("User picture updated");
                console.log("uname " + req.body.username + " path "  + photo);
            }
    
            updatedPicture().then(
                ok => {res.status(200).json({'user' : 'ok'})}
            ).catch(
                err => { res.status(400).json({'user' : 'no'})}
            )
        }
    })
   
});

router.route('/dummyRoute').get((req, res)=>
{
	console.log('Done the dummy route');
	res.status(200).json({'user' : 'ok'});
});

router.route('/login').post((req, res)=>
{
    let username = req.body.username;
    let password = req.body.password;
    
    user.findOne({'username' : username}, (err, user)=>
    {
        if(user === null)
        {
            res.json(user);
        }
        else
        {
            var checkHash = crypto.pbkdf2Sync(password,  user.get("salt"), 1000, 64, `sha512`).toString(`hex`); 
            var hash = user.get("hash")

            if(checkHash === hash)
            {
                console.log("gettingUserForLogin");
                if(err) console.log(err);
                else res.json(user);
            }
            else
            {
                let noObj = null;
                res.json(noObj);
            }
            
        }
       
        
    })

});


router.route('/register').post((req, res) =>
{
    let username = req.body.username;
    let mail = req.body.mail;

    if(req.body.password !== req.body.confpassword)
    {
        console.log('Passwords dont match!');
        res.status(200).json({'user' : 'er1'});
        return;

    }
    else
    {   
        user.findOne({'username' : username}, (err, exists)=>
        {
            if(err) console.log(err);
            else if(exists != null)
                {
                    console.log('Username is already taken!');
                    res.status(200).json({'user' : 'er2'});
                    return;
                }
                else
                {
                    user.findOne({'mail' : mail}, (err, exists)=>
                    {
                        if(err) console.log(err);
                        else if(exists != null)
                        {
                            console.log('Email is already taken!');
                            res.status(200).json({'user' : 'er3'});
                            return;
                        }
                        else
                        {
                            if(!customRegexp.test(req.body.password))
                            {
                                console.log("Password bad!")
                                res.status(200).json({'user' : 'er4'});
                                return;

                            }
                            else
                            {
                                let newSalt = crypto.randomBytes(16).toString('hex'); 
                                let newHash = crypto.pbkdf2Sync(req.body.password, newSalt,  1000, 64, `sha512`).toString(`hex`); 
                                

                                const dataUser =
                            {
                                name : req.body.name,
                                surname : req.body.surname,
                                username : req.body.username,
                                password : req.body.password,
                                mail : req.body.mail,
                                city : req.body.city,
                                phone : req.body.phonenumber,
                                type : req.body.type,
                                description : "",
                                listoftrainings : new Array,
                                trrequest : "",
                                status : req.body.status,
                                location : "",
                                image : "",
                                dateFrom : new Date,
                                membership : "notset",
                                salt : newSalt,
                                hash : newHash  ,
                                personalrequest : false,
                                qrcode : ""
                                
                            }
                            let newUser = new user(dataUser);
                             newUser.save().then(newUser =>
                                {
                                    console.log('User registered');

                                    //ovde

                                    let user_id;

                                    user_id = req.body.username;
                                    console.log("dobio uname za verif" + user_id)

                                    var date = new Date();
                                    var mail = {
                                    "id": user_id,
                                    "created": date.toString()
                                    }
                                    const token_mail_verification = jwt.sign(mail, 'JWT_SECRET', { expiresIn: '1d' });

                                    console.log("napravio jwt token za verif")
                                    
                                    var url = "http://localhost:4200/" + "verify?id=" + token_mail_verification;

                                    console.log("napravio url za verif")
                                
                                    let transporter = nodemailer.createTransport({
                                        host: 'smtp.mailtrap.io',
                                        port: 2525,
                                        auth: {
                                            user: "2c2601bb653e23",
                                            pass: "79ef238b86e0d4"
                                        }
                                    })
                                
                                    console.log("napravio transporter ")

                                    transporter.sendMail({
                                        from: 'milos.jacimovic997@gmail.com', // sender address
                                        to: req.body.mail, // list of receivers seperated by comma
                                        subject: "Account Verification", // Subject line
                                        text: "Click on the link below to veriy your account " + url, // plain text body
                                    }, (error: any, info: any) => {
                                
                                        if (error) {
                                            console.log(error)
                                            return;
                                        }
                                        console.log('Message sent successfully!');
                                        console.log(info);
                                        transporter.close();
                                    });
                                    console.log("zavrsio slanje maila")
                                    res.status(200).json({'user' : 'ok'});
                                 }).catch(err =>
                                    {
                                          console.log('error');
                                          res.status(400).json({'user' : 'error'});
                                    });
                            }

                            
                        }
                    });
                }
         });
    }
   
    
});



router.route('/getOneUser').post((req, res)=>
{
    let username = req.body.username;

    user.findOne({'username' : username}, (err, user) =>
    {
        if(err) console.log(err);
        else  
        {
            console.log("GotUserForProfile");
            res.json(user);
        }
    })

});

router.route('/updateOneUser').post((req, res)=>
{
    const updatedUser = async() =>
    {
        await user.updateOne({"username" : req.body.username}, {$set : {"mail" : req.body.mail, "city" : req.body.city, "phone" : req.body.phone}});
        console.log("User info updated");
    }

    updatedUser().then(
        ok => {res.status(200).json({'user' : 'ok'})}
    ).catch(
        err => { res.status(400).json({'user' : 'no'})}
    )
});

router.route('/resetUserDate').post((req, res)=>
{
    const resetedUserDate = async() =>
    {
        await user.updateOne({"username" : req.body.uname}, {$set : {"dateFrom" : null}});
        console.log("User date reseted");
    }

    resetedUserDate().then(
        ok => {res.status(200).json({'user' : 'ok'})}
    ).catch(
        err => { res.status(400).json({'user' : 'no'})}
    )
});


router.route('/requestTraining').post((req, res)=>
{
    const trainingRequest = async() =>
    {
        await user.updateOne({"username" : req.body.username}, {$set : {"trrequest" : req.body.training}});
        console.log("User training request updated");
    }

    trainingRequest().then(
        ok => {res.status(200).json({'user' : 'ok'})}
    ).catch(
        err => { res.status(400).json({'user' : 'no'})}
    )
});

router.route('/acceptTrainingRequest').post((req, res)=>
{
    user.collection.updateOne({"username" : req.body.username}, {$push : {"listoftrainings" : req.body.training}})
    const trainingAccept = async() =>
    {
        await user.updateOne({"username" : req.body.username}, {$set : {"trrequest" : ''}});
        console.log("User training request updated");
    }

    trainingAccept().then(
        ok => {res.status(200).json({'user' : 'ok'})}
    ).catch(
        err => { res.status(400).json({'user' : 'no'})}
    )
});




router.route('/updatePassword').post((req, res)=>
{

    user.findOne({"username" : req.body.username}, (err, exists)=>
    {
        if(err) console.log(err);
        else if(exists == null)
        {
            res.status(200).json({'user' : 'er1'});
        }
        else{

            let checkHash = crypto.pbkdf2Sync(req.body.oldpassword,  exists.get("salt"), 1000, 64, `sha512`).toString(`hex`); 
            let hash = exists.get("hash")

            if(checkHash != hash)
            {
                res.status(200).json({'user' : 'er1'});
            }
            else
            {
                if(req.body.newpassword !== req.body.confpassword)
                {
                    res.status(200).json({'user' : 'er2'});
                }
                else
                {
                    if(!customRegexp.test(req.body.newpassword))
                    {
                        console.log("Password bad!")
                        res.status(200).json({'user' : 'er3'});
                        return;

                    }

                    let newSalt = crypto.randomBytes(16).toString('hex'); 
                    let newHash = crypto.pbkdf2Sync(req.body.newpassword, newSalt,  1000, 64, `sha512`).toString(`hex`); 

                    const updatedPassword = async()=>
                    {
                        await user.updateOne({"username" : req.body.username}, {$set: {"hash" : newHash, "salt" : newSalt}})
                    }

                    updatedPassword().then(
                        ok => { res.status(200).json({'user' : 'ok'}); console.log('UpdatedPassword')}
                    ).catch(
                        err => { res.status(400).json({'user' : 'no'})}
                    )
                }
            }
            
        }
    })
})

router.route('/getAllUsers').get((req, res)=>
{
    user.find({"type" : "user"}, (err, allUsers)=>
    {
        if(err) console.log(err);
        else
        {
            console.log('GotAllUsers')
            res.json(allUsers);
        }
    })
})

router.route('/getApprovedUsers').get((req, res)=>
{
    user.find({"type" : "user", "status" : "1"}, (err, ApprovedUsers)=>
    {
        if(err) console.log(err);
        else
        {
            console.log('GotApprovedUsers')
            res.json(ApprovedUsers);
        }
    })
})



router.route('/getAllPersonnel').get((req, res)=>
{
 
    user.find({"type" : {$in : ['trainer', 'admin']}}, (err, AllPersonel)=>
    {
        if(err) console.log(err);
        else
        {
            console.log('GotAllPersonel')
            res.json(AllPersonel);
        }
    })
})

router.route('/getAllTrainers').get((req, res)=>
{
 
    user.find({"type" : "trainer"}, (err, AllTrainers)=>
    {
        if(err) console.log(err);
        else
        {
            console.log('GotAllTrainers')
            res.json(AllTrainers);
        }
    })
})


router.route('/approveUser').post((req, res)=>
{
    let today = Date.now();
    var qrCode : String;

    qr.toDataURL(req.body.username, (err: any, src: any) => {
        if (err) 
        {
            console.log("5")
            res.send("Error occured");
        }
      
        // Let us return the QR code image as our response and set it to be the source used in the webpage
        console.log("Made QR code")
        qrCode = src;
        //res.render("scan", { src });

        console.log(qrCode);
        const updateUserStatus = async()=>
        {
            await user.updateOne({"username" : req.body.username}, {$set: {"status" : 1, "dateFrom" : today, "membership" : "valid", "qrcode" : qrCode}})
        }
    
        updateUserStatus().then(
            ok => { res.status(200).json({'user' : 'ok'}); console.log('ApprovedUser')}
        ).catch(
            err => { res.status(400).json({'user' : 'no'})}
        )
    });
  
    
})

router.route('/api/v1/product/upload_products_file').post((req, res)=>{
    getRawBody(req).then((buf) => {
        const fs = require('fs');
        fs.writeFile('new_products_add.txt', buf, function(err: any) {
            let data = fs.readFileSync('new_products_add.txt','utf8');
            var matches = data.match(/\{[^\}]*}/g);
            for (let i = 0; i<matches.length; i++) {
                let newUser = JSON.parse(matches[i]);
                const userData = 
                {

                    name : newUser.name,
                    surname : newUser.surname,
                    username : newUser.username,
                    password : newUser.password,
                    mail : newUser.mail,
                    city : newUser.city,
                    phone : newUser.phone,
                    type : newUser.type,
                    description : "",
                    listoftrainings : new Array,
                    trrequest : "",
                    status : newUser.status,
                    location : newUser.location,
                    image : newUser.image,
                    membership : newUser.membership                    
                }
               

                const addOneUser = async() =>
                {
                    let addUser = new user(userData);
                    addUser.save();
                }
            
                addOneUser().then(
                    ok => {res.status(200).json({'status' : 'ok'}); console.log('AddedOneUserJSON')}
                ).catch(
                    err => { res.status(400).json({"status": "no"})}
                )
            }
        });
    }).catch((err) => {
        console.log(err)
        res.statusCode = err.statusCode;
        res.end(err.message);
        return;
    });
});

router.route('/deleteUser').post((req, res)=>
{
    const deleteUser = async() =>
    {
        console.log(req.body.username);
        await user.deleteOne({"username" : req.body.username});
    }

    deleteUser().then(
        ok => {res.status(200).json({'user' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"user": "no"})}
    )

})


router.route('/deleteTraining').post((req, res)=>
{
    const deletedTraining = async() =>
    {
        console.log(req.body.username);
        await training.deleteOne({"name" : req.body.name});
    }

    deletedTraining().then(
        ok => {res.status(200).json({'training' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"training": "no"})}
    )

})

router.route('/updateUser').post((req, res)=>
{
    const approvedUser = async() =>
    {
        console.log(req.body.username);
        await user.updateOne({"username" : req.body.username}, {$set : {"type" : req.body.type}});
    }

    approvedUser().then(
        ok => {res.status(200).json({'user' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"user": "no"})}
    )

})

router.route('/changeTrainerDesc').post((req, res)=>
{
    const trainerDescChanged = async() =>
    {
        console.log(req.body.username);
        await user.updateOne({"username" : req.body.username}, {$set : {"description" : req.body.desc}});
    }

    trainerDescChanged().then(
        ok => {res.status(200).json({'user' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"user": "no"})}
    )

})

router.route('/getExpiredUsers').get((req, res)=>
{
  
    user.find({"membership" : "expired"}, (err, expired)=>
    {
        if(err) console.log(err)
        else res.json(expired);
    })

})

router.route('/renewMembership').post((req, res)=>
{
    let today = Date.now();
    user.updateOne({"username" : req.body.uname}, {$set : {"membership" : "valid", "dateFrom" : today}}, (err, updated)=>
    {
        if(err) console.log(err)
        else
        {
            console.log("Updated membership for user");
            res.status(200).json(updated);
        }
    })
});




router.route('/getAllMemberships').get((req, res)=>
{
    membership.find({}, (err, AllMemberships)=>
    {
        if(err) console.log(err);
        else
        {
            console.log('GotAllMemberships')
            res.json(AllMemberships);
        }
    })
})

router.route('/getPersonalTrainers').get((req, res)=>
{
    user.find({"listoftrainings" : "Personal"}, (err, PersonalTrainers)=>
    {
        if(err) console.log(err);
        else
        {
            console.log('GotPersonalTrainers')
            res.json(PersonalTrainers);
        }
    })
})


router.route('/getPersonalTraining').get((req, res)=>
{
    training.findOne({"name" : "Personal"}, (err, PersonalTr)=>
    {
        if(err) console.log(err);
        else
        {
            console.log('GotPersonalTraining')
            res.json(PersonalTr);
        }
    })
})

router.route('/getAllGroupTrainings').get((req, res)=>
{
    training.find({"name" : {$ne : 'Personal'}}, (err, AllTrainings)=>
    {
        if(err) console.log(err);
        else
        {
            console.log('GotAllGroupTrainings')
            res.json(AllTrainings);
        }
    })
})


router.route('/updateMembership').post((req, res)=>
{
    const updatedMembership = async() =>
    {
        console.log(req.body.name);
        await membership.updateOne({"name" : req.body.name}, {$set : {"description" : req.body.description, "duration" : req.body.duration, "price" : req.body.price, "discount" : req.body.discount}});
    }

    updatedMembership().then(
        ok => {res.status(200).json({'membership' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"membership": "no"})}
    )
})

router.route('/updateTraining').post((req, res)=>
{
    const updatedTraining = async() =>
    {
        console.log(req.body.name);
        await training.updateOne({"name" : req.body.name}, {$set : {"description" : req.body.description, "duration" : req.body.duration, "intensity" : req.body.intensity}});
    }

    updatedTraining().then(
        ok => {res.status(200).json({'training' : 'ok'})}
    ).catch(
        err => { res.status(400).json({"training": "no"})}
    )
})


router.route('/getAllTrainings').get((req, res)=>
{
    training.find({}, (err, AllTrainings)=>
    {
        if(err) console.log(err);
        else
        {
            console.log('GotAllTrainings')
            res.json(AllTrainings);
        }
    })

   
})

router.route('/addTraining').post((req, res)=>
{
    const dataTraining =
    {
        name : req.body.name,
        description : req.body.description,
        duration : req.body.duration,
        intensity : req.body.intensity,
        image : ""
    }
    let newTraining = new training(dataTraining);
    newTraining.save().then(newTraining =>
        {
            console.log('Training added');
            res.status(200).json({'training' : 'ok'});
         }).catch(err =>
            {
                  console.log('error');
                  res.status(400).json({'training' : 'error'});
            });
})

router.route('/newsLetterRequest').post((req, res)=>
{
    const newsLetterData =
    {
        mail : req.body.mail
    }

    let newNewsLetterRequest = new newsletter(newsLetterData);
    newNewsLetterRequest.save().then(newNewsLetterRequest =>
        {
            console.log('New news letter request added');
            res.status(200).json({'mail' : 'ok'});
         }).catch(err =>
            {
                  console.log('error');
                  res.status(400).json({'mail' : 'error'});
            });
})

router.route('/getNewsLetterSubs').get((req, res)=>
{
    newsletter.find({}, (err, AllSubs)=>
    {
        if(err) console.log(err);
        else
        {
            console.log('GotAllSubs')
            res.json(AllSubs);
        }
    })

})

router.route('/getNumOfSubs').get((req, res)=>
{
    newsletter.countDocuments({}, (err, num)=>
    {
        if(err) console.log(err)
        else
        {
            console.log('GotNumOfSubs');
            res.json(num);
        }
    })

})

router.route('/NewsLetterMail').post((req, res)=>
{
    let subs = req.body.subs;

    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: "2c2601bb653e23",
            pass: "79ef238b86e0d4"
        }
    })

    let message = {
        from: req.body.mail,
        to: "milos.jacimovic997@gmail.com",
        subject: req.body.subject,
        text: req.body.message
    }
 
    subs.forEach((element: { mail: string; }) => {
        
        message.to = element.mail;
        
        transporter.sendMail(message, function(err: any,info: any){
            if (err) {
                console.log(err)
            } 
            })
       
    });

    console.log('Sent out newsletter to all subs.')
    res.json({'mail' : 'ok'});
})

router.route('/searchUsers').post((req, res)=>
{
    console.log("searching for: " + req.body.name + " " + req.body.surname)

    user.find({'type' : 'user', 'name' : req.body.name, 'surname' : req.body.surname}, (err, Users)=>
    {
        if(err) console.log(err);
        else res.json(Users);
    })
})

router.route('/getMyRequestUser').post((req, res)=>
{
    console.log("Getting user personal training request");

   personalRequest.findOne({"attendee" : req.body.username}, (err, Request)=>
   {
       if(err) console.log(err)
       else res.json(Request);
   })
})

router.route('/getMyRequestsTrainer').post((req, res)=>
{
    console.log("Getting trainer personal training request");

   personalRequest.findOne({"trainer" : req.body.username}, (err, Request)=>
   {
       if(err) console.log(err + "jhasbdhasjhdabdsah")
       else 
       {
           res.json(Request);
       }
   })
})

router.route('/acceptPersonalRequest').post((req, res)=>
{

    personalRequest.findOne({"attendee" : req.body.attendee, "trainer" : req.body.trainer}, (err, Request)=>
    {
        if(err)
        {
            console.log(err)
        } 
        else
        {
            const pTraining =
            {
                name : Request.get("name"),
                surname : Request.get("surname"),
                attendee : Request.get("attendee"),
                trainer : Request.get("trainer"),
                numperweek : Request.get("numperweek"),
                status : "in_progress",
                trainerName : Request.get("trainerName"),
                phone : Request.get("phone")
            }

            let newPersonalTraining = new personalTraining(pTraining);
            newPersonalTraining.save().then(newPersonalTraining =>
                {
                   personalRequest.deleteOne({"attendee" : req.body.attendee, "trainer" : req.body.trainer}, (err)=>
                   {
                       if(err) console.log(err)
                       else 
                       {
                           const updatedTraining = async() =>
                           {
                               await  user.updateOne({"username" : req.body.attendee}, {$set : {"personalrequest" : false}})
                           }
                       
                           updatedTraining().then(
                               ok => {res.status(200).json({'training' : 'ok'})}
                           ).catch(
                               err => { res.status(400).json({"training": "no"})}
                           )
                       }
                   })
                   
                 }).catch(err =>
                    {
                          console.log('error');
                          res.status(400).json({'training' : 'no'});
                    });
            
        }
    })

    

})

router.route('/getUsersInProgressTrainings').post((req, res)=>
{
    personalTraining.findOne({"attendee" : req.body.username, "status" : "in_progress"}, (err, Trainings)=>
    {
        if(err) console.log(err)
        else res.json(Trainings);
    })
})

router.route('/getUsersDeninedTrainings').post((req, res)=>
{
    personalTraining.find({"attendee" : req.body.username, "status" : "rejected"}, (err, Trainings)=>
    {
        if(err) console.log(err)
        else res.json(Trainings);
    })
})

router.route('/getUsersCompletedTrainings').post((req, res)=>
{
    personalTraining.find({"attendee" : req.body.username, "status" : "completed"}, (err, Trainings)=>
    {
        if(err) console.log(err)
        else res.json(Trainings);
    })
})

router.route('/getTrainersInProgressTrainings').post((req, res)=>
{
    personalTraining.find({"trainer" : req.body.username, "status" : "in_progress"}, (err, Trainings)=>
    {
        if(err) console.log(err)
        else res.json(Trainings);
    })
})

router.route('/getTrainersDeninedTrainings').post((req, res)=>
{
    personalTraining.find({"trainer" : req.body.username, "status" : "rejected"}, (err, Trainings)=>
    {
        if(err) console.log(err)
        else res.json(Trainings);
    })
})

router.route('/getTrainersCompletedTrainings').post((req, res)=>
{
    personalTraining.find({"trainer" : req.body.username, "status" : "completed"}, (err, Trainings)=>
    {
        if(err) console.log(err)
        else res.json(Trainings);
    })
})


router.route('/renewPersonalTraining').post((req, res)=>
{
    personalTraining.findById(req.body.id, (err, Okk)=>
    {
        if(err) console.log(err)
        else
        {
            let renew = Okk.get("originalPerWeek");

                const updatedTraining = async() =>
                           {
                               await    personalTraining.updateOne({"_id" : req.body.id}, {$set : {"numperweek" : renew}});
                           }
                       
                           updatedTraining().then(
                               ok => {console.log("Renewd personal training"); res.status(200).json({'training' : 'ok'})}
                           ).catch(
                               err => { res.status(400).json({"training": "no"})}
                           )
            
        }
        
    })
})

router.route('/attendGroupTraining').post((req, res)=>
{
    

    const updateGroupTraining = async() =>
                           {
                               await    CurrentGroupTraining.findOneAndUpdate({"_id" : req.body.id}, {$inc : {'numofpeople' : 1}})
                           }
                       
                           updateGroupTraining().then(
                               ok => 
                               {
                                    const updateGroupTrainingAgain = async() =>
                                    {
                                        await    CurrentGroupTraining.findOneAndUpdate({"_id" : req.body.id}, {$push : {'participants' : req.body.uname}})
                                    }
                                
                                    updateGroupTrainingAgain().then(
                                        ok => {console.log("Attended group training"); res.status(200).json({'ok' : 'ok'})}
                                    ).catch(
                                        err => { res.status(400).json({"training": "no"})}
                                    )
                               }
                           ).catch(
                               err => { res.status(400).json({"training": "no"})}
                           )
})

router.route('/cancelGroupTraining').post((req, res)=>
{
    
console.log("usao")
    const updateGroupTraining = async() =>
                           {
                               await    CurrentGroupTraining.findOneAndUpdate({"_id" : req.body.id}, {$inc : {'numofpeople' : -1}})
                           }
                       
                           updateGroupTraining().then(
                               ok => 
                               {
                                    const updateGroupTrainingAgain = async() =>
                                    {
                                        await    CurrentGroupTraining.findOneAndUpdate({"_id" : req.body.id}, {$pull : {'participants' : req.body.uname}})
                                    }
                                
                                    updateGroupTrainingAgain().then(
                                        ok => {console.log("Attended group training"); res.status(200).json({'ok' : 'ok'})}
                                    ).catch(
                                        err => { res.status(400).json({"training": "no"})}
                                    )
                               }
                           ).catch(
                               err => { res.status(400).json({"training": "no"})}
                           )
})



router.route('/doneOneTraining').post((req, res)=>
{
    personalTraining.findById(req.body.id, (err, Okk)=>
    {
        if(err) console.log(err)
        else
        {
            let left = Okk.get("numperweek");
            if(left == 1)
            {
                const updatedTraining = async() =>
                           {
                               await   personalTraining.updateOne({"_id" : req.body.id}, {$set : {"numperweek" : 0, "status" : "completed"}});
                           }
                       
                           updatedTraining().then(
                               ok => {res.status(200).json({'training' : 'ok'})}
                           ).catch(
                               err => { res.status(400).json({"training": "no"})}
                           )
            }
            else
            {
                left--;
                const updatedTraining = async() =>
                           {
                               await    personalTraining.updateOne({"_id" : req.body.id}, {$set : {"numperweek" : left}});
                           }
                       
                           updatedTraining().then(
                               ok => {res.status(200).json({'training' : 'ok'})}
                           ).catch(
                               err => { res.status(400).json({"training": "no"})}
                           )
            }
        }
        
    })
})

router.route('/rejectPersonalTrainingRequest').post((req, res)=>
{

    personalRequest.findOne({"attendee" : req.body.attendee, "trainer" : req.body.trainer}, (err, Request)=>
    {
        if(err)
        {
            console.log(err)
        } 
        else
        {
            const pTraining =
            {
                name : Request.get("name"),
                surname : Request.get("surname"),
                attendee : Request.get("attendee"),
                trainer : Request.get("trainer"),
                numperweek : Request.get("numperweek"),
                status : "rejected",
                trainerName : Request.get("trainerName"),
                phone : Request.get("phone")
            }

            let newPersonalTraining = new personalTraining(pTraining);
            newPersonalTraining.save().then(newPersonalTraining =>
                {
                   personalRequest.deleteOne({"attendee" : req.body.attendee, "trainer" : req.body.trainer}, (err)=>
                   {
                       if(err) console.log(err)
                       else 
                       {
                           const updatedTraining = async() =>
                           {
                               await  user.updateOne({"username" : req.body.attendee}, {$set : {"personalrequest" : false}})
                           }
                       
                           updatedTraining().then(
                               ok => {res.status(200).json({'training' : 'ok'})}
                           ).catch(
                               err => { res.status(400).json({"training": "no"})}
                           )
                       }
                   })
                   
                 }).catch(err =>
                    {
                          console.log('error');
                          res.status(400).json({'training' : 'no'});
                    });
            
        }
    })

    

})



router.route('/individualTrainingRequest').post((req, res)=>
{
    console.log("Adding personal training request" + req.body.trainer)

    let trainerName;

    user.findOne({"username" : req.body.trainer}, (err, Trainer)=>
    {
        if(err) console.log(err + "dadadasdsad")
        else
        {
            trainerName = Trainer.get("name")
            console.log(trainerName);

            const personalTraining =
            {
                name : req.body.name,
                surname : req.body.surname,
                attendee : req.body.attendee,
                trainer : req.body.trainer,
                numperweek : req.body.numperweek,
                originalPerWeek : req.body.numperweek,
                description : req.body.description,
                status : 0,
                trainerName : trainerName,
                phone : req.body.phone
            }

            console.log(personalTraining);
            let newPersonal = new personalRequest(personalTraining);
            newPersonal.save().then(newPersonal =>
                {
                    console.log('Personal training request added');
                    
        
                    const updatedUserRequest = async() =>
                    {
                        console.log("Updating user request flag");
                        await user.updateOne({"username" : req.body.attendee}, {$set : {"personalrequest" : true}});
                    }
        
                    updatedUserRequest().then(
                        ok => { res.status(200).json({'request' : 'ok'}); }
                    ).catch(
                        err => { res.status(400).json({"request": "no"});  console.log("aaaaaaaaa")}
                    )
        
                   
                 }).catch(err =>
                    {
                          console.log('error');
                          res.status(400).json({'request' : 'no'});
                    });
        }
    })

  

    
})



router.route('/getGym').get((req, res)=>
{
    gym.findOne({}, (err, Gym)=>
    {
        if(err) console.log(err);
        else res.json(Gym);
    })
})

router.route('/getAllWeeklyGroupTrainings').get((req, res)=>
{
    CurrentGroupTraining.find({}, (err, Trainings)=>
    {
        if(err) console.log(err);
        else
        {
            console.log("Got all weekly group trainings");
            res.json(Trainings);
        }
    })
})


router.route('/getMyWeeklyTrainings').post((req, res)=>
{
    CurrentGroupTraining.find({"trainer" : req.body.username}, (err, Trainings)=>
    {
        if(err) console.log(err)
        else res.json(Trainings);
    })
})

router.route('/canIMakeNewPersonalRequest').post((req, res)=>
{

        console.log("Checking myself");
        personalTraining.findOne({"attendee" : req.body.myUsername, "status" : "in_progress"}, (err, Me)=>
        {
            if(err) console.log(err)
            else
            {
                if(Me !== null)
                {
                    res.status(200).json({'request' : 'no'});
                }
                else
                {
                    res.status(200).json({'request' : 'ok'});
                }
            }
        })
})

router.route('/trainerNewGroupTraining').post((req, res)=>
{
    const newGroupTraining =
            {
                name : req.body.name,
                trainer : req.body.trainer,
                duration : req.body.duration,
                time : req.body.time,
                maxpeople : req.body.max,
                participants : new Array,
                numofpeople : 0,
                day : req.body.day
            }

            
            let newGroupTr = new CurrentGroupTraining(newGroupTraining);
            newGroupTr.save().then(newGroupTr =>
                {
                    console.log("Adding new group training for the week");
                    res.status(200).json({'training' : 'ok'});
                 }).catch(err =>
                    {
                          console.log('error');
                          res.status(400).json({'training' : 'no'});
                    });
})


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));