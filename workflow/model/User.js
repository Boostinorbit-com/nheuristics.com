require('routes/dbConnect');
// import { Schema } from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//const LEVEL = require('routes/config/levelConstant');


var JobSeekerSchema = new Schema({
    name: { type: String, required:true},
    email: { type: String, required:true, index :{ unique  : true}},
    password: { type: String, required:true},
    passwordHistory:[{ 
        password : String,
        changedDate : { type : Date, default : Date.now }
    }],
    nationality:{ type: String, required: true},
    contactNumber: { type: String, required: true},
    gender: { type: String, required: false},
    profilePicture: { type: String, default: null},
    profileAlbum:[{
        name: { type: String, default: null},
        size: { type: String, default: null},
        type: { type: String, default: null},
        content: { type: String, default: null},
        createdAt: { type: Date, default: Date.now }
    }],
    backgroundPicture: { type: String, default: null},
    BackgroundAlbum:[{
        name: { type: String, default: null},
        size: { type: String, default: null},
        type: { type: String, default: null},
        content: { type: String, default: null},
        createdAt: { type: Date, default: Date.now }
    }],
    about:{type: String, required: false},
    experience: [{
        designation: { type: String, require:  false},
        organisation: { type: String, require: false },
        fromDate: { type: String, require: false },
        toDate: { type: String, require: false },
        description: { type: String, require:  false},
        createdAt : { type: Date, default : Date.now },
    }],
    educations: [{
        education: { type: String, require:  false},
        university: { type: String, require: false },
        fromDate: { type: String, require: false },
        toDate: { type: String, require: false },
        description: { type: String, require:  false},
        createdAt : { type: Date, default : Date.now },
    }],

    skillSet:[{
        skill: { type:String, require: false},
        rate: { type: Number, require: false },
        
    }],
    messages: [{
        type : Schema.Types.ObjectId,
        ref: 'JobSeeker',
    }],
    exclusions:[{
        type : Schema.Types.ObjectId,
        ref: 'JobSeeker',
    }],
    modifiedAt : { type: Date, default : Date.now },
    createdAt : { type: Date, default : Date.now },
    isActive : {type  : Boolean, default : 1 },
    inActiveDate  : { type : Date, default : null },
});

JobSeekerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("JobSeeker", JobSeekerSchema);


