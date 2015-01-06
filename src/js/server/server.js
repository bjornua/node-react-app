/*global require, module, process */
/*jslint sloppy: true */

var express = require('express');
var React = require('react');
var env = require('../env');

function handleRequest(req, res) {
    res.charset = 'utf-8';
    res.header('Content-Type', 'text/html');

    env.create(req.url).then(function (component) {
        var body = React.renderToString(component);
        return body;
    }).catch(function (err) {
        return '<pre>' + err.stack + '</pre>';
    }).done(function (body) {
        req.socket.setNoDelay(true);
        req.socket.setKeepAlive(false);
        res.charset = 'utf-8';
        res.header('Content-Type', 'text/html');
        res.end(body);
    });
}

function createApp() {
    var app = express();
    app.get('*', handleRequest);
    return app;
}
module.exports = {
    createApp: createApp
};