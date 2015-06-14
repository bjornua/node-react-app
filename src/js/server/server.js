/*global require, module, process */
"use strict";

var express = require("express");
var Router = require("react-router");
var React = require("react");
var stackTraceHandler = require("./stacktracehandler");

function handleRequest(req, res) {

    try {
        Router.run(require("../urls"), req.path, function (Root) {
            var body;
            // var env = require("../env");
                // var dispatcher = env.createDispatcher();
                // var component = env.createElement({dispatcher: dispatcher});
            try {
                body = React.renderToString(React.createElement(Root));
            } catch (err) {
                return stackTraceHandler(err, req, res);
            }
            req.socket.setNoDelay(true);
            req.socket.setKeepAlive(false);
            res.charset = "utf-8";
            res.header("Content-Type", "text/html");
            res.end(body);
        });
    } catch (err) {
        return stackTraceHandler(err, req, res);
    }

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
