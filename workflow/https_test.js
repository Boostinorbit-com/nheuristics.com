

const https = require('https');
const fs = require('fs');

const options = {
  key:  fs.readFileSync(__dirname+'/sslcert/key.pem'),
  cert: fs.readFileSync(__dirname+'/sslcert/cert.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);


