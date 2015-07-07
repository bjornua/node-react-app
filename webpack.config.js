"use strict";
var path = require("path");

module.exports = {
    context: __dirname + "/src/js/",
    entry: {
        app: ["./browser-entrypoint.js"]
    },
    output: {
        path: __dirname + "/build/",
        filename: "script.js"
    },
    resolveLoader: { root: path.join(__dirname, "node_modules") },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel"
            }
        ]
    }
};
