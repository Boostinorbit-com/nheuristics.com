


const express = require('express');
const app = express();
const config = require('routes/config/config');
app.set('superSecret', config.superSecret); // config file
const moment = require('moment');
const jwt = require('jsonwebtoken');
const JobSeeker = require('model/User');
const Helper = require('routes/utils/helper');
const UserService = require("routes/services/user");
const bcrypto = require('bcrypt');


module.exports.AllUserInfo = async function(req, res,next){
    console.log(":::::::::::=====>>> " , req.body);
    token = req.body.TOKEN;
    jwt.verify(token,app.get('superSecret'), (err, user)=>{
        if(err){
            console.log(err);
        }else{
            const condition = {
                name: req.body.exclusion_name,
            }

            UserService.AllUsersInfos(condition,function(err,data){
                if(err){
                    return res.status(400).json({
                        timestamp : moment().unix(),
                        success : false,
                        message  : "GOT ERROR",
                        err : req.err
                    });
                }else if(data.length){
                    return res.status(200).send({
                        timestamp : moment().unix(),
                        success  : true,
                        message : "successfully Found",
                        data: data
                    });
                }else{
                    return res.status(200).send({
                        timestamp : moment().unix(),
                        success  : false,
                        message : "Not Found",
                        data: data
                    });
                }
            });
        }
    });
}
