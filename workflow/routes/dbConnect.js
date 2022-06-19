exports = mongoose = require('mongoose');
exports = autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const CONFIG = require("routes/config/dbConfig");
// require('dotenv').config();
console.log(CONFIG, process.env.env);
if(CONFIG.hasOwnProperty(process.env.env)){
	mongoose.connect(CONFIG[process.env.env], {useNewUrlParser: true, useUnifiedTopology: true} ,function(err){
	    if(err){
			console.log("Error in connecting "+process.env.env+" database : ",err);
			process.exit(0);
	    }else{
	        console.log(process.env.env + " Database connected");
	    }
	});
}else{
	console.log(process.env.env,"Env not supported"); process.exit(0);
}

exports.Schema = mongoose.Schema;
