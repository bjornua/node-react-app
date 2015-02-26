/*global require */
/*jslint sloppy: true */

Error.stackTraceLimit = Infinity;

var fs = require('fs');

var server = require('./server/server');
var _ = require('lodash');

var socketpath = '/tmp/app.socket';

function beginServer() {
    var app = server.createApp();
    fs.unlink(socketpath, _.noop);
    var appserver = app.listen(socketpath, function () {
        // This actually helps trigger livereload at the right moment
        // (see gulpfile.js)
        console.log('Listening on ' + socketpath);
    });
    appserver.setTimeout(200);
}
beginServer();
