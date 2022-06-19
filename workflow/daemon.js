

// var forever = require('forever');

// var child = new forever.Forever('app.js', {
//   max: 3,
//   silent: true,
//   args: []
// });

// child.on('exit', this.callback);
// child.start();


var daemon = require("daemonize2").setup({
    main: "app.js",
    name: "sampleapp",
    pidfile: "sampleapp.pid"
});

switch (process.argv[2]) {

    case "start":
        daemon.start();
        break;

    case "stop":
        daemon.stop();
        break;

    default:
        console.log("Usage: [start|stop]");
}