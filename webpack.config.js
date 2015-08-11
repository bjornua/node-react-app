"use strict";
var path = require("path");
var webpack = require("webpack");

var DEVELOPMENT = process.env.DEVELOPMENT === "true";

var ExtractTextPlugin = require('extract-text-webpack-plugin');


var common = function () {
    return {
        context: __dirname + "/src/js/",
        output: {
            path: path.join(__dirname, "build"),
            pathinfo: true
        },
        module: {
            loaders: [{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel"
            }, {
                test: /\.png$/,
                loader: "file-loader",
                query: {
                    mimetype: "image/png",
                    name: "/image/[sha512:hash:base64:10].png"
                }
            }, {
                test: /\.less$/,
                loader: "css!less"
            }, {
                test: /\.json$/,
                loader: "json-loader"
            }]
        },
        resolve: {
            extensions: ["", ".js", ".jsx"]
        },
        resolveLoader: { root: path.join(__dirname, "node_modules") },
        devtool: DEVELOPMENT ? "eval" : "#source-map",
        watchOptions: {
            aggregateTimeout: 0
        },
        plugins: DEVELOPMENT ? [] : [
            new webpack.DefinePlugin({"process.env": {"NODE_ENV": "\"production\""}}),
            new webpack.optimize.UglifyJsPlugin({output: {comments: false}}),
        ]
    };
};

var server = function () {
    var fs = require("fs");

    var nodeModules = {};
    fs.readdirSync("node_modules")
        .filter(function(x) {
            return [".bin"].indexOf(x) === -1;
        })
        .forEach(function(mod) {
            nodeModules[mod] = "commonjs " + mod;
        });
    var config = common();
    config.entry = "./server-entrypoint.js";
    config.target = "node";
    config.output.filename = "backend/script.js";
    config.externals = nodeModules;
    // config.plugins.push(new webpack.IgnorePlugin(/\.(css|less)$/));
    config.plugins.push(new webpack.BannerPlugin("require(\"source-map-support\").install();", { raw: true, entryOnly: false }));
    config.plugins.push(new webpack.DefinePlugin({"HAS_WINDOW": false}));

    config.devtool = "#source-map";

    return config;
};

var client = function () {
    var config = common();
    config.entry = "./browser-entrypoint.js";
    config.output.filename = "frontend.js";
    config.plugins.push(new webpack.DefinePlugin({"HAS_WINDOW": true}));
    
    return config;
};

module.exports = [server(), client()];
