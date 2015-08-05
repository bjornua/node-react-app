/*global require, module, process */
"use strict";

import express from "express";
import * as React from "react";
import stackTraceHandler from "./stacktracehandler";

import webpackMiddleware from "webpack-dev-middleware";
import webpack from "webpack";

const encoding = "utf-8";

function handleRequest(req, res) {
    try {
        var Handler = require("../main");
        let body;
        try {
            body = React.renderToString(<Handler url={req.path}/>);
        } catch (err) {
            return stackTraceHandler(err, req, res);
        }
        req.socket.setNoDelay(true);
        req.socket.setKeepAlive(false);
        res.charset = encoding;
        res.header("Content-Type", "text/html");
        res.end(body);
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

export function createApp() {
    const app = express();
    app.get("*", handleRequest);
    return app;
}
