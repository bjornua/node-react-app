"use strict";

module.exports = {
    context: __dirname + "/src/js/",
    entry: {
        app: ["./browser-entrypoint.js"]
    },
    output: {
        path: __dirname + "/build/",
        filename: "script.js"
    },
    modules: {
        loaders: [
            {
                // test: /\.jsx$/,
                loader: "babel-loader"
            }
        ]
    }
};
