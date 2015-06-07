/*global require, module, process */
"use strict";

var express = require("express");
var React = require("react");
var env = require("../env");

function htmlEntities(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function stackTraceHandler(err, req, res) {
    res.charset = "utf-8";
    res.header("Content-Type", "text/html");
    res.status(500);
    req.socket.setNoDelay(true);
    req.socket.setKeepAlive(false);

    var stack = htmlEntities(err.stack);
    stack = stack.replace(/^[^\/\n]*\/app\/src\/js\/.*$/gm, function (s) {
        return "<span style='color: #000;'>" + s + "</span>";
    });
    stack = stack.split("\n");
    stack[0] = "<div style='color: #000; font-size: 140%; padding: 1em; background: #eee;'>" + stack[0] + "</div>";
    stack = stack.join("<br/>");

    var body = "";
    body += "<!doctype html>\n";
    body += "<html>\n";
    body += "<head>\n";
    body += "<title>Error</title>\n";
    body += "</head>\n";
    body += "<body style='margin: 0;'>\n";
    body += "<pre style='font-size: 140%; color:#aaa; margin: 0;'>";
    body += stack + "\n";
    body += "</pre>\n";
    body += "</body>\n";
    body += "</html>";

    res.end(body);
}


function handleRequest(req, res) {
    var body;
    try {
        var dispatcher = env.createDispatcher(req.url);
        var component = env.createElement({dispatcher: dispatcher});
        body = React.renderToString(component);
    } catch (err) {
        stackTraceHandler(err, req, res);
        return;
    }
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
