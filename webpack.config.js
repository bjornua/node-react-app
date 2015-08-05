"use strict";
var path = require("path");
var webpack = require("webpack");

var DEVELOPMENT = process.env.DEVELOPMENT === "true";

var definePlugin = new webpack.DefinePlugin({
    "process.env": {
        "NODE_ENV": "\"production\""
    }
});
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    output: {comments: false}
});

module.exports = {
    context: __dirname + "/src/js/",
    entry: {
        app: ["./browser-entrypoint.js"]
    },
    output: {
        path: __dirname + "/build/",
        filename: "script.js",
        pathinfo: true
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
    },
    plugins: DEVELOPMENT ? [] : [definePlugin, uglifyPlugin],
    devtool: DEVELOPMENT ? "eval" : "#source-map",
    watchOptions: {
        aggregateTimeout: 0
    }
    // devServer: {
    //     contentBase: "./build",
    //     noInfo: false, //  --no-info option
    //     hot: false,
    //     inline: true,
    //     port: 8081,
    //     lazy: true
    // }
};
