/*global require, module, process */
"use strict";

var express = require("express");
var React = require("react");
var env = require("../env");

function handleRequest(req, res) {
    res.charset = "utf-8";
    res.header("Content-Type", "text/html");
    var component = env.create(req.url);
    var body = React.renderToString(component);
    req.socket.setNoDelay(true);
    req.socket.setKeepAlive(false);
    res.charset = "utf-8";
    res.header("Content-Type", "text/html");
    res.end(body);

//     env.create(req.url).then(function (component) {
//         var body = React.renderToString(component);
//         return body;
//     }).catch(function (err) {
//         return "<pre>" + err.stack + "</pre>";
//     }).done(function (body) {
//     });
}

function createApp() {
    var app = express();
    app.get("*", handleRequest);
    return app;
}
module.exports = {
    createApp: createApp
};
