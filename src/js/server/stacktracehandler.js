"use strict";

import _ from "lodash";


export default function stackTraceHandler (err, req, res) {
    res.charset = "utf-8";
    res.header("Content-Type", "text/html");
    res.status(500);
    req.socket.setNoDelay(true);
    req.socket.setKeepAlive(false);

    let stack = err.stack;
    stack = _.takeWhile(stack.split("\n"), function (val) {
        return !_.startsWith(val, "    at handleRequest (/app/src/js/server/server.js");
    }).join("\n");

    stack = _.escape(stack);
    stack = stack.replace(/^[^\/\n]*\/app\/build\/backend\/webpack:.*$/gm, function (s) {
        return "<span style='color: #000;'>" + s + "</span>";
    });

    stack = stack.split("\n");
    let header = "";
    header += "<div style='color: #000; font-size: 140%; padding: 1em; background: #eee;'>";
    header += stack[0];
    header += "</div>";

    stack[0] = header;
    stack = stack.join("<br/>");

    let body = "";
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
