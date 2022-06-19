
const express = require('express');
const app = express();
//const config = require('routes/config/config');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const JobSeeker = require('model/User');
//console.dir(JobSeeker)
//const Helper = require('routes/utils/helper');
const UserService = require("routes/services/user");
const bcrypt = require('bcrypt');

module.exports = async function(req, res,next){
    try{
        const hashPassword = await bcrypt.hash(req.body.Password, 10);

        body = {
            name: req.body.Firstname+ " " + req.body.Lastname,
            email: req.body.Email ,
            password: hashPassword,
            nationality: req.body.Nationality,
            contactNumber: req.body.ContactNumber
        }
        console.log(body);
        jobSeeker = new JobSeeker(body);
        jobSeeker.save().then(item =>{
            console.log("\nSAVE in DATABASE::", item);
        }).catch(err =>{
            console.log("Email id should be unique");
        });

    }catch{
        console.log('register:Exception Throw')
    }

}
