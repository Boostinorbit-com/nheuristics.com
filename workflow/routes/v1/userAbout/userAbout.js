
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

module.exports.setExperience = async function( req, res, next){

    console.log(req.body)
    token = req.body.token;
    jwt.verify(token,app.get('superSecret'), (err, user)=>{
        if(err){
            console.log(err);

        }else{
            console.log(user.id);

            const condition = {
                _id: user.id
            }
            const updateData = {
                experience: req.body.data
            }
            console.log("updateData ==>>: ", updateData);
            UserService.userUpdate(condition, {$push: updateData}, function(err,data){
                console.log(data);
                if(err){
                    return res.status(400).json({
                        timestamp : moment().unix(),
                        success : false,
                        message  : "GOT ERROR",
                        err : req.err
                    });
                }else{
                    return res.status(200).send({
                        timestamp : moment().unix(),
                        success  : true,
                        message : "successfully updated",

                    });
                }
            });

        }

    });

}

module.exports.setEducation = async function( req, res, next){

    console.log(req.body)
    token = req.body.token;
    jwt.verify(token,app.get('superSecret'), (err, user)=>{
        if(err){
            console.log(err);

        }else{
            console.log(user.id);

            const condition = {
                _id: user.id
            }
            const updateData = {
                educations: req.body.data
            }
            console.log("updateData ==>>: ", updateData);
            UserService.userUpdate(condition, {$push: updateData}, function(err,data){
                if(err){
                    return res.status(400).json({
                        timestamp : moment().unix(),
                        success : false,
                        message  : "GOT ERROR",
                        err : req.err
                    });
                }else{
                    return res.status(200).send({
                        timestamp : moment().unix(),
                        success  : true,
                        message : "successfully updated",

                    });
                }
            });

        }

    });

}

module.exports.putUserAbout = async function(req, res,next){

    console.log(req.body)
    token = req.body.token;
    jwt.verify(token,app.get('superSecret'), (err, user)=>{
        if(err){
            console.log(err);

        }else{
            console.log(user.id);

            const condition = {
                _id: user.id
            }
            const updateData = {
                about: req.body.description
            }
            UserService.userUpdate(condition, {$set: updateData}, function(err,data){
                if(err){
                    return res.status(400).json({
                        timestamp : moment().unix(),
                        success : false,
                        message  : "GOT ERROR",
                        err : req.err
                    });
                }else{
                    return res.status(200).send({
                        timestamp : moment().unix(),
                        success  : true,
                        message : "successfully updated",

                    });
                }
            });

        }

    });

}



module.exports.getUserAllInfo = async function(req, res,next){
  console.log(req.body);
    const userId = req.body.userId.split('.')[1];
    const hash = req.body.hash.split('#')[1];
    console.log("::::::::::::====> ", hash);
    console.log("==>", userId);
    const token = req.body.TOKEN;
    jwt.verify(token,app.get('superSecret'), (err, user)=>{
        if(err){
            console.log(err);
        }else{
          const condition = {};
            if(hash == "true"){
              const condition = {
                  _id: user.id
                }
                UserService.userAllInfo(condition,function(err,data){
                  if(err){
                      return res.status(400).json({
                          timestamp : moment().unix(),
                          success : false,
                          message  : "GOT ERROR",
                          err : req.err
                        });
                      }else{
                        return res.status(200).send({
                          timestamp : moment().unix(),
                          success  : true,
                          message : "successfully updated",
                          data: data
                        });
                      }
                });
            }
            else {
              const condition = {
                _id:userId
              }
              UserService.userAllInfo(condition,function(err,data){
                if(err){
                    return res.status(400).json({
                        timestamp : moment().unix(),
                        success : false,
                        message  : "GOT ERROR",
                        err : req.err
                      });
                    }else{
                      return res.status(200).send({
                        timestamp : moment().unix(),
                        success  : true,
                        message : "successfully updated",
                        data: data
                      });
                    }
              });

            }


      }
    });
}

module.exports.setProfilePic = async function(req, res, next){

    token = req.body.token;
    if( !token){
        return res.status(200).send({
            timestamp : moment().unix(),
            success  : false,
            message : "Token not passed",
        });
    }
    jwt.verify(token,app.get('superSecret'), (err, user)=>{
        if(err){
            return res.status(200).send({
                timestamp : moment().unix(),
                success  : false,
                message : "Invalid token",
            });
        }else{
            const condition = {
                _id: user.id,
            }
            const set_data = {
                profilePicture: req.body.data.content,
            }
            UserService.userUpdate(condition, {$set: set_data}, function(err,data){
                if(err){
                    return res.status(200).send({
                        timestamp : moment().unix(),
                        success  : false,
                        message : "Error",
                    });
                }else{
                    req['next'] = {
                        success: true,
                        data: data,
                    }
                    next();
                }
            });
        }

    });

}

module.exports.pushProfilePic = async function(req, res){

    if(!req['next'].success){
        return res.status(200).send({
            timestamp : moment().unix(),
            success  : false,
            message : "Error",
        });
    }

    token = req.body.token;

    jwt.verify(token,app.get('superSecret'), (err, user)=>{
        if(err){
            return res.status(200).send({
                timestamp : moment().unix(),
                success  : false,
                message : "Invalid token",
            });
        }else{
            const condition = {
                _id: user.id,
            }
            const push_data ={
                profileAlbum: req.body.data,
            }

            UserService.userUpdate(condition,{$push: push_data }, function(err,data){
                if(err){
                    return res.status(200).send({
                        timestamp : moment().unix(),
                        success  : false,
                        message : "Error",
                    });
                    console.log(err);
                }else{
                    return res.status(200).send({
                        timestamp : moment().unix(),
                        success  : true,
                        message : "successfully updated",
                        data: data
                    });
                }
            });
        }
    });
}

module.exports.setBackgroundPic = async function(req, res, next){
    token = req.body.token;
    if( !token){
        return res.status(200).send({
            timestamp : moment().unix(),
            success  : false,
            message : "Token not passed",
        });
    }
    jwt.verify(token,app.get('superSecret'), (err, user)=>{
        if(err){
            return res.status(200).send({
                timestamp : moment().unix(),
                success  : false,
                message : "Invalid token",
            });
        }else{
            const condition = {
                _id: user.id,
            }
            const updateData = {
                backgroundPicture: req.body.data.content
            }
            UserService.userUpdate(condition, {$set: updateData}, function(err,data){
                if(err){
                    return res.status(200).send({
                        timestamp : moment().unix(),
                        success  : false,
                        message : "Error",
                    });
                }else{
                    req['next'] = {
                        success: true,
                        data: data,
                    }
                    next();
                }
            });

        }

    });

}

module.exports.pushBackgroundPic = async function(req, res){
    if(!req['next'].success){
        return res.status(200).send({
            timestamp : moment().unix(),
            success  : false,
            message : "Error",
        });
    }

    token = req.body.token;
    if( !token){
        return res.status(200).send({
            timestamp : moment().unix(),
            success  : false,
            message : "Token not passed",
        });
    }
    jwt.verify(token,app.get('superSecret'), (err, user)=>{
        if(err){
            return res.status(200).send({
                timestamp : moment().unix(),
                success  : false,
                message : "Invalid token",
            });
        }else{
            const condition = {
                _id: user.id,
            }
            const updateData = {
                BackgroundAlbum: req.body.data
            }
            UserService.userUpdate(condition, {$push: updateData}, function(err,data){
                if(err){
                    return res.status(200).send({
                        timestamp : moment().unix(),
                        success  : false,
                        message : "Error",
                    });
                }else{
                    return res.status(200).send({
                        timestamp : moment().unix(),
                        success  : true,
                        message : "successfully updated",
                        data: data
                    });
                }
            });

        }

    });

}
