require('rootpath')();
const express = require('express');
const multer = require("multer");
const apiRoutes = express.Router();

apiRoutes.get("/rest/getenv", function(req, res) {
    var env = process.env.env;
    res.json({ result: env });
});



/*
 ******* XLVM Index Page 
 */




/*
 ******* Login and Auths for both clients and seekers
//  */
// const login = require("routes/v1/authentication/login");
// apiRoutes.post('/login', login.getUserInfo, login.createToken);

// const register = require("routes/v1/register/register");
// apiRoutes.post('/register', register);

// /*
//  ******* Save experince for both clients and seekers
//  */
// const userAbout = require("routes/v1/userAbout/userAbout");
// apiRoutes.post('/experience', userAbout.putUserAbout);
// apiRoutes.post('/setExperience', userAbout.setExperience);
// apiRoutes.post('/setEducation', userAbout.setEducation);
// apiRoutes.post('/userAllInfo', userAbout.getUserAllInfo);
// apiRoutes.post('/setProfilePic', userAbout.setProfilePic, userAbout.pushProfilePic);
// apiRoutes.post('/setBackgroundPic', userAbout.setBackgroundPic, userAbout.pushBackgroundPic);

// /*
//  ******* Save experince for both clients and seekers
//  */
// const AllUsersInfos = require("routes/v1/allUsersInfos/allUsersInfos");
// apiRoutes.post('/AllUserInfo', AllUsersInfos.AllUserInfo);


module.exports = apiRoutes;