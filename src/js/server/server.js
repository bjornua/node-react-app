/*global require, module, process */
"use strict";

import express from "express";
import * as React from "react";
import stackTraceHandler from "./stacktracehandler";
const encoding = "utf-8";

function handleRequest(req, res) {
    try {
        const {getApp} = require("../env");
        const ServerView = require("../server-component");
        let body;
        try {
            body = React.renderToStaticMarkup(getApp(req.path, ServerView));
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
