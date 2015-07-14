"use strict";
import React from "react";
import Router from "react-router";

var MainComponent = React.createClass({
    displayName: "MainComponent",

    render: function () {
        var title = "Untitled";

        return <html>
            <head>
                <title>{title}</title>
                <link rel="stylesheet" type="text/css" href="/style.css" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            </head>
            <body>
                <Router.RouteHandler/>
                <script async={true} src="/script.js" />
                <script async={true} src="http://localhost:35729/livereload.js"/>
            </body>
        </html>;
    }
});

module.exports = MainComponent;
