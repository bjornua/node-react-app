"use strict";

module.exports = {
    context: __dirname + "/src/js/",
   entry: {
        app: ["webpack/hot/dev-server", "./browser-entrypoint.js"]
    },
    output: {
        path: __dirname + "/build/",
        filename: "bundle.js",
        publicPath: "/assets/"
    }

};
