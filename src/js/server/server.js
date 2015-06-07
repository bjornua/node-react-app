/*global require, module, process */
"use strict";

var express = require("express");
var React = require("react");
var _ = require("lodash");


function stackTraceHandler(err, req, res) {
    res.charset = "utf-8";
    res.header("Content-Type", "text/html");
    res.status(500);
    req.socket.setNoDelay(true);
    req.socket.setKeepAlive(false);

    var stack = err.stack;
    stack = _.takeWhile(stack.split("\n"), function (val) {
        return !_.startsWith(val, "    at handleRequest (/app/src/js/server/server.js");
    }).join("\n");

    stack = _.escape(stack);
    stack = stack.replace(/^[^\/\n]*\/app\/src\/js\/.*$/gm, function (s) {
        return "<span style='color: #000;'>" + s + "</span>";
    });

    stack = stack.split("\n");
    var header = "";
    header += "<div style='color: #000; font-size: 140%; padding: 1em; background: #eee;'>";
    header += stack[0];
    header += "</div>";

    stack[0] = header;
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
        var env = require("../env");
        var dispatcher = env.createDispatcher(req.url);
        var component = env.createElement({dispatcher: dispatcher});
        body = React.renderToString(component);
    } catch (err) {
        return stackTraceHandler(err, req, res);
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
