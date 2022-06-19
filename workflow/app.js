/*
 * @Author: Zask Nafis Ayaz
 * @Date: 01-01-2019 20:35:20 
 * @Last Modified by: sir_ayaz@boostinorbit.com
 */

let nodeGeocoder = require('node-geocoder');
require('rootpath')();
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var os = require('os');
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync(__dirname+"/sslcert/key.pem");
var certificate = fs.readFileSync(__dirname+"/sslcert/cert.pem");

var credentials = {key: privateKey, cert: certificate};

var util = require('util');
var app = express();
var cors = require('cors');
//const initialize = require("initialization/initialize")();

// view engine setup
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));

let options = {
  provider: 'openstreetmap'
};
 
let geoCoder = nodeGeocoder(options);




// app.enable('trust proxy');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname+'/../front-bone/', 'templates')));
app.use(express.static(path.join(__dirname+'/../front-bone/', 'images')));
app.use(express.static(path.join(__dirname+'/../front-bone/', 'css')));
app.use(express.static(path.join(__dirname+'/../front-bone/', 'icons')));
app.use(express.static(path.join(__dirname+'/../front-bone/', 'js')));
console.log(__dirname, " :===> ", path.join(__dirname+'/../front-bone/', 'templates'))


httpPort = 80;
httpsPort = 443;

var http = http.createServer(app);
var https = https.createServer(credentials, app);

app.use(function(req, res, next) {
    var oneof = false;
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if (req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if (req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if (oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});


/**
 * @ROUTING
 */
const adminRoutes = require('routes/v1/route');
app.use('/', adminRoutes);
// app.use('/api/v1', adminRoutes);

/**
 * END ROUTING
 */


let locations = []

app.post("/location", function(req, res){

	console.log(req.body);
	geoCoder.reverse(req.body.message).then((res)=> {
    	
		console.log("\n===============================================================\n\n\n");
    		
		res[0].ip = req.body.ip
		console.log("log ==> ",res[0], "\n\n");
		
		locations.push(res[0]);
  	
	}).catch((err)=> {
    		console.log(err);
  	});

});


app.get("/fetchLocations", function(req, res){

    console.log("log ==> ", locations, "\n\n");
    console.log("\n===============================================================\n\n\n");
    res.end(JSON.stringify(locations))
});
		
app.get('/admin', function(req, res) {
    var filePath = path.normalize( __dirname+'/../front-bone/templates/'+'admin.html');
    console.log("=========================>  ", filePath)
    res.sendFile(filePath);
});


app.get("/", function(req, res) {
    var env = process.env.env;
    console.log("env ======> ", env);

    res.sendFile("index.html");
});

app.get("/images/Cascaron.svg", function(req, res) {
    var env = process.env.env;
    res.sendFile(__dirname + "/images/Cascaron.svg");
});

global.hostname = os.hostname();
console.log(global.hostname);


http.listen(httpPort, ()=>{
    console.log(`Server started at http: localhost:${httpPort}`);
});


https.listen(httpsPort,  ()=>{
    console.log(`Server started at https: localhost:${httpsPort}`);
});


//app.listen('80', '0.0.0.0')
//module.exports = app;


module.exports = http;

module.exports = https;



