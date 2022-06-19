

const express = require('express');
const app = express();
const config = require('routes/config/config');
app.set('superSecret', config.superSecret); // config file
const moment = require('moment');
const jwt = require('jsonwebtoken');
const JobSeeker = require('model/User');
//console.dir(JobSeeker)
const Helper = require('routes/utils/helper');
const UserService = require("routes/services/user");
const bcrypto = require('bcrypt');


module.exports.getUserInfo = async function(req, res,next){
    if( (Helper.isValidString(req.body.email) || Helper.isValidString(req.body.mobile)) && Helper.isValidString(req.body.password)){

        condition = {  email : req.body.email};
        UserService.userInfo(condition,function(err,data){
            console.log(data);
            if(err){
                return res.status(400).json({
                    timestamp : moment().unix(),
                    success : false,
                    message  : "GOT ERROR",
                    err : err
                });
            }else if(!data){
                return res.status(400).json({
                    timestamp : moment().unix(),
                    success : false,
                    message  : "Mobile or Password not matching!",
                    data : data
                });
            }else{
                try{
                    bcrypto.compare(req.body.password, data.password, function(err, is_matched){
                        if(is_matched){
                            req["data"] = data;
                            next();
                        }else{
                            return res.status(400).json({
                                timestamp : moment().unix(),
                                success : false,
                                message  : "Password not matching!",
                                data : {email: data.email, password: req.body.password }
                            });
                        }

                    });
                }catch{
                    return res.status(400).json({
                        timestamp : moment().unix(),
                        success : false,
                        message  : "Password not matching!",
                        data : data
                    });
                }
            }
        });

    }else{
        return res.status(400).json({timestamp : moment().unix(), success  : false,message : "Invalid params!"});
    }
}

module.exports.createToken = function(req, res, next){
    if(req.err){
        return res.status(400).json({
            timestamp : moment().unix(),
            success : false,
            message  : "GOT ERROR",
            err : req.err
        });
    }else if(!req.data){
        return res.status(400).json({
            timestamp : moment().unix(),
            success : false,
            message  : "Email or Password not matching!",
            data : req.data
        });
    }else{
        let rowData = req.data;
        let exp = moment().valueOf() + (6 * 30 * 24 * 60 * 60 * 60 * 60 * 1000);//
        let tData = {
            id: rowData._id,
            userType : req.body.userType,
            iat : moment().valueOf(),
            exp : exp
        };
        let token = jwt.sign(tData, app.get('superSecret'), {
            //expiresIn: 6 * 30 * 24 * 3600 // expires
            //expiresIn: 6 // expires
        });

        return res.status(200).send({
            timestamp : moment().unix(), success  : true,
            message : "Enjoy your token!",
            token : token,
            data  : {
                _id : rowData._id,
                email : rowData.email,
                name : rowData.name,
                mobile : rowData.mobile
            }
        });
    }
}
